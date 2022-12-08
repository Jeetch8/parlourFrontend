import axios from "axios";
import JoditEditor from "jodit-react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { baseDomain } from "../../Utills/BaseUrl";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editor = () => {
  const blogId = useParams().blogId;
  console.log(blogId);
  const toast = useToast();
  const naviagte = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");

  const {} = useQuery(
    ["fetchBlogToEdit"],
    () => {
      return axios.get(`${baseDomain}/blogs/blog/${blogId}`);
    },
    {
      onSuccess: (data) => {
        const blog = data.data.blog;
        setTitle(blog.title);
        setImage(blog.blogImg);
        setContent(blog.HTMLBody);
      },
    }
  );

  const handleSubmit = () => {
    if (image === "" || content === "" || title === "") {
      toast({
        title: "All Fields are madotary",
        status: "error",
        duration: 2000,
        isClosable: false,
        position: "top",
      });
      return;
    }
    axios
      .post(
        baseDomain + `/blogs/editblog/${blogId}`,
        {
          HTMLBody: `${content}`,
          title: `${title}`,
          blogImg: image,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((resp) => console.log(resp.data))
      .then(() => {
        toast({
          title: "Blog Saved",
          status: "success",
          duration: 2000,
          isClosable: false,
          position: "top",
        });
        // setTimeout(() => {
        //   naviagte("/admin/dashboard/blogs");
        // }, 2000);
      })
      .catch((error) => console.log(error));
  };
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    let imgData = new FormData();
    imgData.append("image", img);
    axios
      .post(baseDomain + "/imageUpload/imagaeUploadCloudniary", imgData)
      .then((res) => setImage(res.data.image.src));
  };

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
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
          <Button
            size={{ base: "sm", lg: "md" }}
            rounded={"full"}
            backgroundColor={"blackAlpha.200"}
            className=" bg-zinc-500 text-white py-[1vh] px-[1.5vw] rounded-full"
            onClick={() => naviagte("/admin/dashboard/blogs")}
          >
            Cancel
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
            {image ? (
              <Box h="10vh">
                <Image
                  src={image}
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
          </FormLabel>
          <Input
            type={"file"}
            accept="image/*"
            display={"none"}
            onChange={(e) => handleImageChange(e)}
          />
        </FormControl>
      </Box>
      <Box w={{ lg: "70vw", base: "96vw" }} marginX="auto" mb="10px">
        {/* <label htmlFor="">Title</label> */}
        <Input
          placeholder="Title"
          type="text"
          width={"full"}
          value={title}
          className="border-[1px] border-black w-full my-[5vh] p-[4px] text-[25px]"
          // fontSize={}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box h={"83vh"} w={{ base: "96vw", lg: "70vw" }} marginX="auto">
        <JoditEditor
          ref={editor}
          value={content}
          // config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
      </Box>
    </div>
  );
};

export default Editor;
