import { Box, Center, Container, Flex, Spacer, Text, useRadioGroup, IconButton, Spinner, Grid, GridItem, Link } from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import { type } from "os";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query/";
import { RadioPlaceCard } from "../send/radio";


//來源:https://data.coa.gov.tw/OpenData/Query/AdvSearch.aspx?id=078
//api: https://data.coa.gov.tw/OpenData/Service/OpenData/DataFileService.aspx?UnitId=078&$top=1000&$skip=0

const apiUrl = "https://data.coa.gov.tw/OpenData/Service/OpenData/DataFileService.aspx?UnitId=078&$top=1000&$skip=0"

type HosItem = {
  "縣市": string,
  "字號": string,
  "執照類別": string,
  "狀態": string,
  "機構名稱": string,
  "負責獸醫": string,
  "機構電話": string,
  "機構地址": string,
  "發照日期": string,
}


const queryClient = new QueryClient()

export const HosSection = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <HosSectionInner />
    </QueryClientProvider>
  )
}

export const HosSectionInner = () => {

  const [place, setPlace] = useState("北部")

  const { getRadioProps } = useRadioGroup({
    name: 'place',
    defaultValue: '北部',
    onChange: setPlace,
    value: place
  })

  //react-query
  const { isLoading, isFetching, error, data, isError, isSuccess } = useQuery<HosItem[], Error>('hosData', () =>
    fetch(apiUrl).then(res => {

      // console.log("🚀 ~ file: index.tsx ~ line 39 ~ HosSectionInner ~ res.json()", res.json())
      if (res.ok) {
        return res.json()
      }
    }),
    { refetchOnWindowFocus: false }
  )

  const pAN = ["臺北市", "新北市", "基隆市", "新竹市", "桃園市", "新竹縣", "宜蘭縣"]
  const pAM = ["臺中市", "苗栗縣", "彰化縣", "南投縣", "雲林縣"]
  const pAS = ["高雄市", "臺南市", "嘉義市", "嘉義縣", "屏東縣", "澎湖縣"]
  const pAE = ["花蓮縣", "臺東縣", "金門縣", "連江縣", "宜蘭縣"]

  const item = (place: string) => {

    if (isSuccess)
      switch (place) {
        case "北部":
          return (
            <Box>
              <Flex gap={"16px"}>
                {pAN.map(value => <Link  key={value} href={`#${value}`} >{value}</Link>)}
              </Flex>
              {pAN.map(value => <AreaP key={value} data={data} areaName={value} />)}
            </Box>
          )
        case "中部":
          return (
            <Box>
              <Flex gap={"16px"}>
                {pAM.map(value => <Link key={value} href={`#${value}`} >{value}</Link>)}
              </Flex>
              {pAM.map(value => <AreaP key={value} data={data} areaName={value} />)}
            </Box>
          )
        case "南部":
          return (
            <Box>
              <Flex gap={"16px"}>
                {pAS.map(value => <Link key={value} href={`#${value}`} >{value}</Link>)}
              </Flex>
              {pAS.map(value => <AreaP key={value} data={data} areaName={value} />)}
            </Box>
          )
        case "東部":
          return (
            <Box>
              <Flex gap={"16px"}>
                {pAE.map(value => <Link key={value} href={`#${value}`} >{value}</Link>)}
              </Flex>
              {pAE.map(value => <AreaP key={value} data={data} areaName={value} />)}
            </Box>
          )
        default:
          return <></>
      }
  }

  //北部區域：包括臺北市、新北市、基隆市、新竹市、桃園市、新竹縣及宜蘭縣。 中部區域：包括臺中市、苗栗縣、彰化縣、南投縣及雲林縣。 南部區域：包括高雄市、臺南市、嘉義市、嘉義縣、屏東縣及澎湖縣。



  return (
    <Box
      mt="60px"
      h="calc(100vh - 60px)"
      overflowY={"scroll"}
      transition="all 0.5s ease-in-out"

    >
      <Container pt="32px">
        <Text textAlign={["start", "center"]} fontSize={"2xl"} pb={"32px"}>寵物醫院相關資訊<br />(來源：政府農委會)</Text>
        <Center gap={"8px"} flexWrap={"wrap"} mb="16px">
          <RadioPlaceCard {...getRadioProps({ value: "北部" })}  >北部</RadioPlaceCard>
          <RadioPlaceCard {...getRadioProps({ value: "中部" })}  >中部</RadioPlaceCard>
          <RadioPlaceCard {...getRadioProps({ value: "南部" })}  >南部</RadioPlaceCard>
          <RadioPlaceCard {...getRadioProps({ value: "東部" })}  >東部</RadioPlaceCard>
        </Center>
        {isLoading || isFetching ? <Spinner /> : <></>}
        {isError && <Text>{error.message}</Text>}
        {isSuccess && item(place)}
      </Container>
    </Box>
  )
}

interface AreaProps {
  data: HosItem[],
  areaName: string
}

const AreaP = ({ data, areaName }: AreaProps) => {

  return (
    <Box mt="16px" id={areaName}>
      <Flex alignItems={"center"} gap="8px">
        {addressIcon}
        <Text fontSize={"20px"}>{areaName}</Text>
      </Flex>
      <hr />
      <Grid mt="16px" templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={"8px"}>
        {data.filter(value => value.縣市 === areaName).map((value,index) => (
          <GridItem key={index} >
            <HosItemm hosName={value.機構名稱} tel={value.機構電話} address={value.機構地址} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}


interface HosItemProps {
  hosName: string,
  // coutry: string,
  tel: string,
  address: string,
}

const HosItemm = ({ hosName, tel, address }: HosItemProps) => {


  return (
    <Box gap="16px" rounded="10px" shadow={"base"} border={"0.8px solid currentColor"} position="relative" p="8px" >
      <Text>{hosName}</Text>
      <Text>{tel}</Text>
      <Flex align={"baseline"}>
        <Text>{address}</Text>
        <Spacer />
        <a  href={`tel:${tel}`} >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#262626" />
            <path fillRule="evenodd" clipRule="evenodd" d="M27.5793 22.7935C27.68 22.8845 27.756 22.9996 27.8 23.128C27.8675 23.3179 27.9184 23.5133 27.952 23.712C27.9842 23.9131 28.0002 24.1164 28 24.32C28 24.8033 27.9048 25.2818 27.7199 25.7283C27.5349 26.1747 27.2639 26.5804 26.9221 26.9221C26.5804 27.2639 26.1747 27.5349 25.7283 27.7199C25.2818 27.9048 24.8033 28 24.32 28C21.0538 27.9958 17.9226 26.6964 15.6131 24.3869C13.3036 22.0773 12.0042 18.9462 12 15.68C12 14.704 12.3877 13.768 13.0778 13.0778C13.768 12.3877 14.704 12 15.68 12C15.8875 12.0063 16.0938 12.0331 16.296 12.08C16.4922 12.109 16.6852 12.1573 16.872 12.224C17.0004 12.268 17.1155 12.344 17.2065 12.4447C17.2975 12.5455 17.3613 12.6678 17.392 12.8L18.488 17.544C18.5175 17.6743 18.514 17.8099 18.4776 17.9385C18.4413 18.067 18.3734 18.1844 18.28 18.28C18.1818 18.3932 18.1692 18.3996 17.3141 18.8303C17.2631 18.856 17.2091 18.8832 17.152 18.912C17.94 20.6407 19.3226 22.0289 21.048 22.824C21.568 21.832 21.576 21.824 21.688 21.72C21.7836 21.6266 21.901 21.5587 22.0295 21.5223C22.1581 21.486 22.2937 21.4825 22.424 21.512L27.224 22.608C27.3562 22.6387 27.4785 22.7025 27.5793 22.7935ZM16.7422 23.2578C18.7521 25.2678 21.4775 26.3979 24.32 26.4C24.871 26.3979 25.3988 26.1781 25.7885 25.7885C26.1781 25.3988 26.3979 24.871 26.4 24.32V24.056L22.696 23.208L22.464 23.648C22.104 24.344 21.84 24.848 21.168 24.576C19.8423 24.1015 18.639 23.3376 17.6454 22.3399C16.6518 21.3422 15.893 20.1357 15.424 18.808C15.136 18.184 15.68 17.896 16.368 17.536L16.8 17.312L15.944 13.6H15.68C15.129 13.6021 14.6012 13.8219 14.2115 14.2115C13.8219 14.6012 13.6021 15.129 13.6 15.68C13.6021 18.5225 14.7322 21.2479 16.7422 23.2578ZM20.8 13.6C22.2852 13.6 23.7096 14.19 24.7598 15.2402C25.81 16.2904 26.4 17.7148 26.4 19.2C26.4 19.4122 26.4843 19.6157 26.6343 19.7657C26.7843 19.9157 26.9878 20 27.2 20C27.4122 20 27.6157 19.9157 27.7657 19.7657C27.9157 19.6157 28 19.4122 28 19.2C28 17.2904 27.2414 15.4591 25.8912 14.1088C24.5409 12.7586 22.7096 12 20.8 12C20.5878 12 20.3843 12.0843 20.2343 12.2343C20.0843 12.3843 20 12.5878 20 12.8C20 13.0122 20.0843 13.2157 20.2343 13.3657C20.3843 13.5157 20.5878 13.6 20.8 13.6ZM20.8 16.8002C21.4365 16.8002 22.047 17.0531 22.4971 17.5031C22.9471 17.9532 23.2 18.5637 23.2 19.2002C23.2 19.4124 23.2843 19.6159 23.4343 19.7659C23.5843 19.9159 23.7878 20.0002 24 20.0002C24.2122 20.0002 24.4157 19.9159 24.5657 19.7659C24.7157 19.6159 24.8 19.4124 24.8 19.2002C24.8 18.1393 24.3786 17.1219 23.6284 16.3718C22.8783 15.6216 21.8609 15.2002 20.8 15.2002C20.5878 15.2002 20.3843 15.2845 20.2343 15.4345C20.0843 15.5845 20 15.788 20 16.0002C20 16.2124 20.0843 16.4159 20.2343 16.5659C20.3843 16.7159 20.5878 16.8002 20.8 16.8002Z" fill="white" />
          </svg>
        </a>
      </Flex>
    </Box>
  )
}


const addressIcon = <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M2.37124 2.81479C3.86926 1.33176 5.89206 0.499895 8 0.5C10.1079 0.499895 12.1307 1.33176 13.6288 2.81479C15.1268 4.29782 15.9789 6.31216 16 8.42C16 13.9 9 20 8.65 20.26C8.46887 20.4149 8.23835 20.5001 8 20.5001C7.76165 20.5001 7.53113 20.4149 7.35 20.26L7.34836 20.2586C7.02535 19.9787 0 13.8904 0 8.42C0.0210794 6.31216 0.873231 4.29782 2.37124 2.81479ZM2 8.42C2 12.15 6.33 16.56 8 18.15C9.67 16.56 14 12.12 14 8.42C14 6.8287 13.3679 5.30258 12.2426 4.17736C11.1174 3.05214 9.5913 2.42 8 2.42C6.4087 2.42 4.88258 3.05214 3.75736 4.17736C2.63214 5.30258 2 6.8287 2 8.42ZM6.05551 5.08986C6.63108 4.70527 7.30777 4.5 8 4.5C8.92826 4.5 9.8185 4.86875 10.4749 5.52513C11.1313 6.1815 11.5 7.07174 11.5 8C11.5 8.69223 11.2947 9.36892 10.9101 9.9445C10.5256 10.5201 9.97894 10.9687 9.33939 11.2336C8.69985 11.4985 7.99612 11.5678 7.31719 11.4327C6.63825 11.2977 6.01461 10.9644 5.52513 10.4749C5.03564 9.98539 4.7023 9.36175 4.56725 8.68282C4.4322 8.00388 4.50152 7.30015 4.76642 6.66061C5.03133 6.02107 5.47993 5.47444 6.05551 5.08986ZM7.16665 9.2472C7.41332 9.41203 7.70333 9.5 8 9.5C8.39783 9.5 8.77936 9.34196 9.06066 9.06066C9.34197 8.77936 9.5 8.39782 9.5 8C9.5 7.70333 9.41203 7.41332 9.24721 7.16665C9.08238 6.91997 8.84812 6.72771 8.57403 6.61418C8.29994 6.50065 7.99834 6.47094 7.70737 6.52882C7.41639 6.5867 7.14912 6.72956 6.93934 6.93934C6.72956 7.14912 6.5867 7.41639 6.52882 7.70736C6.47095 7.99834 6.50065 8.29994 6.61418 8.57403C6.72771 8.84811 6.91997 9.08238 7.16665 9.2472Z"
    fill="currentColor" />
</svg>
