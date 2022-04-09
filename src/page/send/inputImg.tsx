import { Box ,Center,Image} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";


//上傳寵物相片並預覽,但尚未上傳至sever
//TODO:改成只上傳一張並限制片大小！！

type MyFile = {
  preview: string
} & File


interface ImgFilePreviewProps {
  setImgFile: (file: File) => void
}

export  function ImgFilePreview({ setImgFile }: ImgFilePreviewProps) {
  const [files, setFiles] = useState<MyFile[]>([]);


  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImgFile(acceptedFiles[0])
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <Box w="100%" key={file.name}  overflow={"hidden"} bgColor="#f6f6f6" rounded={"20"} boxShadow="2xl" mt="8px" >
      <Center >
        <Image src={file.preview} alt={file.name}     />
      </Center>
    </Box>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <Box {...getRootProps()} border={"1px"} rounded={"20px"} p={"8"} bgColor="#EEE">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Box>
      <aside >
        {thumbs}
      </aside>
    </section>
  );
}