import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItem,
  ListItemText,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Avatar,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import "../styles/chat.css";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    paddingRight: 0,
    "& fieldset": {
      borderColor: "#ddd",
    },
    "&:hover fieldset": {
      borderColor: "#ccc",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#aaa",
    },
  },
}));

const ChatSection = ({groupId,ConversationId}) => {
//   const { groupId, postTypeId, actionId, ConversationId, title } =
//     selectedArticle.selectedArticle || {};
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msgLoading, setMsgLoading] = useState(false);  
  const [textList, setTextList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversation_Id, setConversationId] = useState("");
  const [token, setToken] = useState("");
  const [isSendDisabled, setIsSendDisabled] = useState(false);
  const [tooltipContents, setTooltipContents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    fileName: "",
    content: "",
  });
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleClickOpenDialog = (file) => {
    console.log("file", file);
    const targetIdentifier = "6faa083c-0d34-4e55-86ce-9b421371f07c";

    const fileCaption = file.fileName;
    const fileType = fileCaption.split(".").pop().toLowerCase();
    let mimeType;
    let viewerUrl;

    switch (fileType) {
      case "pdf":
        mimeType = "application/pdf";
        break;
      case "doc":
      case "docx":
        // For .doc or .docx, use either Google Docs Viewer or Office Viewer
        viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
          "YOUR_FILE_URL"
        )}`;
        break;
      case "xlsx":
        mimeType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      default:
        mimeType = "application/octet-stream";
    }

    let data = JSON.stringify({
      AttachmentIdentifier: targetIdentifier,
      FileCaption: fileCaption,
      FileId: file.fileId,
      FileByte: "",
      AllowedFileCount: 1,
      Remarks: "",
    });

    console.log("data",data);
    console.log("pdfUrl", pdfUrl)

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_MICROSERVICES + "File/GetFiles",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
      responseType: "blob",
    };

    axios
      .request(config)
      .then((response) => {
        const blob = new Blob([response.data], { type: mimeType });
        debugger
        if (fileType === "doc" || fileType === "docx") {
          viewerUrl = `https://www.mass.gov/doc/andys-test-for-url-issue-0/download`;
          // viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(URL.createObjectURL(blob))}`;
          setPdfUrl(viewerUrl);
        } else {
          const blobURL = URL.createObjectURL(blob);
          setPdfUrl(blobURL);
        }
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });

    setSelectedFile(file.content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: "#fff",
      color: "#000",
      fontSize: "14px",
      borderRadius: "8px",
      padding: "12px",
      maxWidth: "550px",
      maxHeight: "300px", // Set maximum height for scroll
      overflowY: "auto", // Enable vertical scroll if content exceeds maxHeight
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
      border: "1px solid #ddd",
      lineHeight: "1.5",
    },
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getGroupByID();
    getConversation(conversation_Id);
  }, [conversation_Id]);

  const getGroupByID = async () => {
    axios
      .post(
        process.env.REACT_APP_MICROSERVICES + "Groups/GetGroupById",
        {
          LoggedUserId: 1,
          params: {
            GroupId: groupId,
          },
        },
        {
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response?.data?.Data) {
          let conID = response?.data?.Data?.GroupDetails?.ConversationId
          if(conID === null){
            setConversationId(ConversationId)
          }else {
            setConversationId(conID)
          }
         
        } else {
          
        }
      })
      .catch((error) => {});
  };

  const getConversation = async (id) => {
    // setConversationId(id);
    axios
      .post(
        process.env.REACT_APP_MICROSERVICES + "Chat/GetChatHistory",
        {
          LoggedUserId: 1,
          params: {
            GroupId: groupId,
            ConversationId: id,
          },
        },
        {
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response?.data?.Data) {
          setMessages(response?.data?.Data?.message);

          const reference = response.data.Data.reference;
          let chunks = [];

          if (Array.isArray(reference)) {
            // If reference is an array, flatten the chunks from each reference item
            chunks = reference.flatMap((item) => item.chunks || []);
          } else if (reference && reference.chunks) {
            // If reference is an object, get chunks directly
            chunks = reference.chunks;
          }

          // Map chunks to tooltip contents
          const contents = chunks.map((chunk) => ({
            content: chunk.content_with_weight || "", // Default to empty string if missing
            fileName: chunk.docnm_kwd || "",
            imageUrl: chunk.image_url || "",
            fileId: chunk.doc_id,
          }));

          setTooltipContents(contents);
        } else {
          setMessages([]);
          setTooltipContents([]); // Clear tooltip contents if no data
        }
      })
      .catch((error) => {});
  };

  const handleSendMessage = async () => {
    const messageToSend = newMessage.trim();
    if (!messageToSend) return;

    setIsSendDisabled(true);
    setMsgLoading(true);

    const newMessages = {
      content: messageToSend,
      role: "user",
      status: "pending",
    };
    const updatedMessages = [...messages, newMessages];
    setMessages(updatedMessages);
    setNewMessage("");

    let data = JSON.stringify({
      LoggedUserId: 1,
      params: {
        GroupId: groupId,
        ConversationId: conversation_Id,
        Content: messageToSend,
      },
    });

    try {
      const response = await axios.post(
        process.env.REACT_APP_MICROSERVICES + "Chat/SendChatQuery",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const assistantMessage = {
        content: response.data.Data,
        role: "assistant",
      };
      getGroupByID();
      setMessages((prevMessages) => {
        const userMessageIndex = prevMessages.length - 1;
        const updatedMessages = [...prevMessages];
        updatedMessages[userMessageIndex].status = "sent";
        return [...updatedMessages, assistantMessage];
      });
    } catch (error) {
      setMessages((prevMessages) => {
        const userMessageIndex = prevMessages.length - 1;
        const updatedMessages = [...prevMessages];
        updatedMessages[userMessageIndex].status = "failed";
        return updatedMessages;
      });
    } finally {
      setIsSendDisabled(false);
      setMsgLoading(false);
    }
  };

  const renderMessageContent = (content) => {
    const markerPattern = /##(\d)\$\$/g;
    const formattedContent = content
      .replace(/\n\n\*/g, "<br />• ") // Convert "\n\n*" to bullet point with newline
      .replace(/\n\n/g, "<br /><br />") // Convert "\n\n" to newline
      .replace(/\\"/g, '"'); // Convert \" to a double quote

    const segments = formattedContent.split(markerPattern);
    const markers = formattedContent.match(markerPattern) || [];
    
    return segments.map((segment, idx) => {
      const isMarker = idx % 2 === 1; // Odd indices are markers
      if (isMarker) {
        const markerIndex = parseInt(segments[idx], 10); // Get the number in the marker
        const tooltipContent = tooltipContents[markerIndex]; // Extract content for this marker
        const isTable = tooltipContent?.content?.trim().startsWith("<table>");
        return (
          <CustomTooltip
            key={idx}
            title={
              <Box>
                {tooltipContent?.imageUrl && (
                  <img
                    src={tooltipContent?.imageUrl}
                    alt={tooltipContent?.fileName || "Image preview"}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  />
                )}
                {/* Display main content */}
                {/* <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                  {tooltipContent?.content || "No additional information"}
                </Typography> */}
                {isTable ? (
                  <Box
                  sx={{
                    overflowX: 'auto', 
                    maxWidth: '100%',
                    '& table': {
                        borderCollapse: 'collapse',
                        width: '100%', 
                    },
                    '& th, & td': {
                        border: '1px solid #ccc',
                        padding: '8px', 
                        textAlign: 'left', 
                    },
                    '& th': {
                        backgroundColor: '#f5f5f5', 
                    },
                }}
                    dangerouslySetInnerHTML={{ __html: tooltipContent?.content }}
                  />
                ) : (
                  <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                    {tooltipContent?.content || "No additional information"}
                  </Typography>
                )}
                {/* Display file name if available */}
                {tooltipContent?.fileName && (
                  <Typography variant="caption">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents navigation
                        handleClickOpenDialog(tooltipContent); // Opens the dialog
                      }}
                      style={{ color: "#1a73e8", textDecoration: "underline" }}
                    >
                      {tooltipContent?.fileName}
                    </a>
                  </Typography>
                )}
              </Box>
            }
            placement="right"
          >
            <InfoIcon
              sx={{
                color: "gray",
                fontSize: "18px",
                verticalAlign: "text-bottom",
                margin: "0 4px",
              }}
            />
          </CustomTooltip>
        );
      }

      return (
        <Box
          key={idx}
          component="span"
          dangerouslySetInnerHTML={{ __html: segment }}
          sx={{
            display: "inline",
            lineHeight: "1.6",
            wordBreak: "break-word",
          }}
        />
      );
    });
  };
console.log("selectedFile",selectedFile);

  return (
    <div
      className="flex flex-col h-full"
      style={{ borderRadius: "0 12px 12px 0" }}
    >
      <div
        className="chatbox flex-1  flex flex-col items-center"
        style={{ padding: "0.5rem" }}
      >
        <List style={{ width: "100%" }}>
          {messages?.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                width: "100%",
                padding: "8px 0",
                display: "flex",
                justifyContent:
                  message?.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "97%",
                  justifyContent:
                    message?.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {message?.role === "assistant" && (
                  <Avatar
                    src="https://via.placeholder.com/150"
                    sx={{ marginRight: 1 }}
                  />
                )}
                <Box
                  sx={{
                    padding: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      message?.role === "user" ? "flex-end" : "flex-start",
                    backgroundColor:
                      message?.role === "user" ? "#f0f0f0" : "#cfe9ff",
                    borderRadius: 2,
                    maxWidth: "100%",
                    // padding: 1,
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    marginLeft: message?.role === "assistant" ? "0" : "auto",
                    marginRight: message?.role === "user" ? "0" : "auto",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ wordBreak: "break-word", lineHeight: "1.6" }}
                  >
                    {renderMessageContent(message?.content)}
                  </Typography>
                </Box>
              </Box>
              {message?.role === "user" && (
                <Avatar
                  src="https://via.placeholder.com/150"
                  sx={{ marginLeft: 1 }}
                />
              )}
            </ListItem>
          ))}
          {msgLoading && (
            <ListItem sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size={24} thickness={4} />
              <ListItemText primary="searching..." sx={{ paddingLeft: 2 }} />
            </ListItem>
          )}
          <div className="chatboxend" ref={messagesEndRef} />
        </List>
      </div>

      <div >
        <StyledTextField
          variant="outlined"
          placeholder="Type a Message"
          className="w-full"
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          value={newMessage}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSendMessage}
                  disabled={isSendDisabled}
                >
                  <SendIcon style={{ color: "#15426c" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": { fontSize: "16px",  height: "50px",  },
            padding: "8px",
            width: "95%",
          }}
          id="Chat-input"
        />
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog} 
       PaperProps={{
        style: {
          width: '1024px',  
          height: '600px',  
          maxWidth: 'none',  
          maxHeight: 'none', 
        },
      }}
       >
        <DialogTitle>{selectedFile?.fileName}</DialogTitle>
        <DialogContent dividers>
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            width="1000"
            height="600"
            title="File Preview"
          ></iframe>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default ChatSection;