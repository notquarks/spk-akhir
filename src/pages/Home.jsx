import { useState, useEffect, useCallback } from "react";
import "../App.css";
import viteLogo from "/vite.svg";
import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Container,
  Heading,
  Text,
  Input,
  UnorderedList,
  ListItem,
  ListIcon,
  List,
} from "@chakra-ui/react";
import Dropzone from "../components/DragnDrop";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { data } from "autoprefixer";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Home() {
  // const onDrop = useCallback((acceptedFiles) => {
  //   const formData = new FormData();
  //   acceptedFiles.map((file) => {
  //     formData.append("File[]", file);
  //   });
  //   try {
  //     axios
  //       .post("/calculate", formData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         console.log(data);
  //         // navigate("/result", {
  //         //   state: { prediction: data.prediction },
  //         // });
  //       });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   // acceptedFiles.map((file) => {
  //   //   const reader = new FileReader();
  //   // });
  // }, []);

  // const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
  //   useDropzone({ accept: { "image/*": [] } });
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState([]);
  useEffect(() => {
    // Perform any actions or updates based on the new 'result' value
    console.log(result);
  }, [result]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);
    try {
      const response = await axios({
        method: "post",
        url: "/calculate",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((data) => {
        console.log(data);
        const parsedData = JSON.parse(data.data);
        setResult(parsedData);
        console.log("result ", result);
        console.log(result.length);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  return (
    <Flex
      m={"auto"}
      flexDir={"column"}
      // w="100vw"
      p={8}
      alignItems="center"
      justifyContent={"space-around"}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading>Tanam Kapan?</Heading>
      </Box>
      <Container py={4}>
        <Center>
          <Text>
            Tentukan kapan penanaman padi dengan data iklim lokasi anda
          </Text>
        </Center>
      </Container>
      {/* <Dropzone onDrop={onDrop} accept={"file/csv"} /> */}
      <Box alignContent={"center"} flex={1} minWidth={"100wv"}>
        <form onSubmit={handleSubmit}>
          <Input type="file" name="file" onChange={handleFileSelect}></Input>
          <Center>
            <Button
              colorScheme={"teal"}
              type="submit"
              value="Upload File"
              my={4}
            >
              Run
            </Button>
          </Center>
        </form>
      </Box>
      {result.length > 0 ? (
        <Stack spacing={2} w="3xl" align={"center"}>
          <Heading my={4}>{result[0].Alternatives}</Heading>
          <List>
            {result.map((item) => (
              <ListItem key={item.Alternatives}>
                <ListIcon as={ArrowForwardIcon} color="green.500" />
                {item.Alternatives}: {item.Score}
              </ListItem>
            ))}
          </List>
        </Stack>
      ) : null}
      <Stack
        p={4}
        alignItems="center"
        justifyContent={"space-around"}
        spacing={2}
      ></Stack>
    </Flex>
  );
}
