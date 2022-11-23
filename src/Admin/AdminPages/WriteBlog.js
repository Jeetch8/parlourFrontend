import { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import ImageResize from "quill-image-resize-module-react";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { baseDomain } from "../../Utills/BaseUrl";
// import { withRouter } from "../AdminComponents/WithRouter";

Quill.register("modules/imageResize", ImageResize);
// var BackgroundClass = Quill.import("attributors/class/background");
// var ColorClass = Quill.import("attributors/class/color");
// var SizeStyle = Quill.import("attributors/style/size");
// Quill.register(BackgroundClass, true);
// Quill.register(ColorClass, true);
// Quill.register(SizeStyle, true);

// var quill = new Quill("#editor-container", {
//   modules: {
//     toolbar: "#toolbar-container",
//   },
//   placeholder: "Compose an epic...",
//   theme: "snow",
// });

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", title: "", image: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }
  componentDidMount() {}

  handleChange(html) {
    this.setState({ editorHtml: html });
  }
  handleNavigation() {
    this.props.navigate("/admin/dashboard/blogs");
  }
  handleTitleChange(title) {
    this.setState({ title: title });
  }
  handleSubmit(status) {
    if (
      this.state.image === "" ||
      this.state.editorHtml === "" ||
      this.state.title === ""
    ) {
      toast.error("All Fields are madotary", {
        position: "top-center",
        closeButton: false,
        hideProgressBar: true,
      });
      return;
    }
    axios
      .post(
        baseDomain + "/blogs/saveBlog",
        {
          HTMLBody: `${this.state.editorHtml}`,
          title: `${this.state.title}`,
          status,
          blogImg: this.state.image,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((resp) => console.log(resp.data))
      .then(() => {
        toast.success("Blog Saved", {
          position: "top-center",
          closeButton: false,
          hideProgressBar: true,
        });
        setTimeout(() => {
          this.handleNavigation();
        }, 2000);
      })
      .catch((error) => console.log(error));
  }
  handleImageChange(e) {
    const img = e.target.files[0];
    let imgData = new FormData();
    imgData.append("image", img);
    axios
      .post(baseDomain + "/imageUpload/imagaeUploadCloudniary", imgData)
      .then((res) => this.setState({ image: res.data.image.src }))
      .then(console.log(this.state.image));
  }

  render() {
    return (
      <div>
        <HStack
          maxW={{ lg: "70vw", base: "100vw" }}
          marginX={"auto"}
          py={"2vh"}
          justify={"space-between"}
          alignItems={"center"}
        >
          <img
            src="https://i.ibb.co/DzZKZHY/medium-icon-white-on-black.png"
            alt="Logo"
            width={70}
          />
          <HStack spacing={{ lg: "5", base: "3" }}>
            <Button
              size={{ base: "sm", lg: "md" }}
              bgColor={"green.500"}
              textColor={"white"}
              fontWeight="medium"
              rounded={"full"}
              className="bg-green-500 text-white font-medium h-fit px-[1.5vw] py-[1vh] rounded-full"
              onClick={() => this.handleSubmit("published")}
            >
              Publish
            </Button>
            <Button
              size={{ base: "sm", lg: "md" }}
              rounded={"full"}
              backgroundColor={"blackAlpha.200"}
              className=" bg-zinc-500 text-white py-[1vh] px-[1.5vw] rounded-full"
              onClick={() => this.handleSubmit("draft")}
            >
              Draft
            </Button>
          </HStack>
        </HStack>
        <Box mx="auto" w={{ lg: "70vw", base: "95vw" }}>
          <Text fontWeight={"semibold"} fontSize="xl">
            Blog Banner
          </Text>
          <FormControl>
            <FormLabel
              mr="auto"
              border={"dashed"}
              h="35vh"
              w={{ lg: "40vw", base: "70vw" }}
              cursor={"pointer"}
              overflow="hidden"
            >
              {this.state.image ? (
                <Box h="10vh">
                  <Image
                    src={this.state.image}
                    alt="teahub-io-sunflower-field-wallpaper-2752583"
                    border="0"
                    w={{ lg: "40vw", base: "70vw" }}
                  />
                </Box>
              ) : (
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  h="30vh"
                >
                  <AiOutlineCloudUpload fontSize={"100px"} fontWeight="light" />
                </Box>
              )}
              {/* <Image
                src={
                  this.state.image
                  ? `${this.state.image}`
                  : "https://i.ibb.co/yYxztSt/upload-files.jpg"
                }
                alt="upload-files"
                m="auto"
                objectFit={"cover"}
                objectPosition="top"
                h="min-content"
                w={{ lg: "20vw", base: "50vw", md: "30vw" }}
              /> */}
            </FormLabel>
            <Input
              type={"file"}
              accept="image/*"
              display={"none"}
              onChange={(e) => this.handleImageChange(e)}
            />
          </FormControl>
        </Box>
        <Box w={{ lg: "70vw", base: "96vw" }} marginX="auto" mb="10px">
          {/* <label htmlFor="">Title</label> */}
          <Input
            placeholder="Title"
            type="text"
            width={"full"}
            className="border-[1px] border-black w-full my-[5vh] p-[4px] text-[25px]"
            // fontSize={}
            onChange={(e) => this.handleTitleChange(e.target.value)}
          />
        </Box>
        <Box h={"83vh"} w={{ base: "96vw", lg: "70vw" }} marginX="auto">
          <ReactQuill
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            bounds={"#root"}
            placeholder={"// Write from here"}
            // style={{ height: "71vh" }}
          />
        </Box>
        <ToastContainer />
      </div>
    );
  }
}

Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default Editor;
