import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useDropzone } from "React-dropzone";

function Dropzone({ onDrop, accept, open }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      onDrop,
    });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Box>
      <Box {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <Box
          className="text-center"
          borderColor={isDragActive ? "ActiveBorder" : "gray.490"}
          bgColor={isDragActive ? "Highlight" : "gray.100"}
          borderStyle={"dashed"}
          borderRadius={"lg"}
        >
          {isDragActive ? (
            <Box
              className="dropzone-content"
              p={8}
              w={"3xl"}
              h="lg"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text>Release to drop the files here</Text>
            </Box>
          ) : (
            <Box
              className="dropzone-content"
              flex={1}
              p={8}
              w={"3xl"}
              h="lg"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text align={"center"}>
                Drag’ n’ drop some files here, or click to select files
              </Text>
            </Box>
          )}
          <Button color={"teal"} type="button" onClick={open} className="btn">
            Click to select files
          </Button>
        </Box>
      </Box>
      {/* <aside>
        <ul>{files}</ul>
      </aside> */}
    </Box>
  );
}

export default Dropzone;
