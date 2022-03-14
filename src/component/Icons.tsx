import { createIcon, Icon, IconProps, LayoutProps, useTheme } from "@chakra-ui/react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Ctx } from "../commen/context";






interface MyIconProps {
  pathName : string
} 

export const PairIcon = ({ pathName , boxSize } : MyIconProps & IconProps) => {
  //get fill colors
  const ctx = useContext(Ctx)
  //determine fill color 
  const location = useLocation()

  const getFillColor = () => pathName === location.pathname ? ctx.topSvgFillColor : ctx.topSvgDefaultColor

  return (
    <Icon boxSize={boxSize}>
      <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" 
          clipRule="evenodd" 
          d="M24.2091 5.09137C24.9868 5.2829 25.4627 6.07223 25.2654 6.84995L21.7134 20.9999C21.5509 21.6441 20.9763 22.0968 20.3089 22.0968C20.1928 22.0968 20.0709 22.0794 19.9548 22.0504L10.4713 19.6708C10.094 19.5779 9.7748 19.3399 9.57747 19.0091C9.38014 18.6783 9.3221 18.2894 9.41496 17.9122L12.9669 3.76228C13.1295 3.11805 13.704 2.66534 14.3715 2.66534C14.4876 2.66534 14.6094 2.68276 14.7255 2.71178L24.2091 5.09137ZM7.52514 17.7032C7.21753 18.9452 7.97204 20.2047 9.21407 20.5181L11.6169 21.1159L7.06083 22.7816C6.89832 22.8397 6.73 22.8687 6.56169 22.8687C5.95228 22.8687 5.40672 22.4856 5.19778 21.9168L0.781011 9.84473C0.647521 9.47909 0.659129 9.08442 0.827442 8.73619C0.995755 8.38795 1.28595 8.12098 1.64579 7.98749L9.60293 5.07393C9.76544 5.01589 9.93375 4.98687 10.1021 4.98687C10.3052 4.98687 10.5025 5.0333 10.6825 5.11456L7.52514 17.7032Z" 
          fill={getFillColor()}
        />
      </svg>
    </Icon>
  ) 
}

export const FavoriteIcon = ({ pathName , boxSize} : MyIconProps & IconProps) => {
  //get fill colors
  const ctx = useContext(Ctx)
  //determine fill color 
  const location = useLocation()

  const getFillColor = () => pathName === location.pathname ? ctx.topSvgFillColor : ctx.topSvgDefaultColor

  return (
    <Icon boxSize={boxSize}>
      <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" 
          clipRule="evenodd" 
          d="M12 22.5405C11.8487 22.5413 11.6987 22.5123 11.5586 22.4551C11.4185 22.3979 11.2911 22.3136 11.1836 22.207L2.2493 13.2612C1.12862 12.1288 0.5 10.5999 0.5 9.00676C0.5 7.41357 1.12862 5.88472 2.2493 4.75233C3.37875 3.62607 4.9087 2.99361 6.50374 2.99361C8.09877 2.99361 9.62872 3.62607 10.7582 4.75233L12 5.99416L13.2418 4.75233C14.3713 3.62607 15.9012 2.99361 17.4963 2.99361C19.0913 2.99361 20.6212 3.62607 21.7507 4.75233C22.8714 5.88472 23.5 7.41357 23.5 9.00676C23.5 10.5999 22.8714 12.1288 21.7507 13.2612L12.8164 22.207C12.709 22.3136 12.5815 22.3979 12.4414 22.4551C12.3013 22.5123 12.1513 22.5413 12 22.5405ZM6.50374 5.29276C6.01698 5.29055 5.53462 5.38495 5.0846 5.57049C4.63459 5.75602 4.22586 6.029 3.88209 6.37361C3.18765 7.07171 2.79782 8.01634 2.79782 9.00101C2.79782 9.98568 3.18765 10.9303 3.88209 11.6284L12 19.7578L20.1179 11.6284C20.8124 10.9303 21.2022 9.98568 21.2022 9.00101C21.2022 8.01634 20.8124 7.07171 20.1179 6.37361C19.4092 5.70407 18.4712 5.33104 17.4963 5.33104C16.5213 5.33104 15.5833 5.70407 14.8746 6.37361L12.8164 8.44334C12.7095 8.55111 12.5823 8.63665 12.4422 8.69503C12.3021 8.7534 12.1518 8.78346 12 8.78346C11.8482 8.78346 11.6979 8.7534 11.5578 8.69503C11.4177 8.63665 11.2905 8.55111 11.1836 8.44334L9.12538 6.37361C8.78161 6.029 8.37288 5.75602 7.92287 5.57049C7.47285 5.38495 6.99049 5.29055 6.50374 5.29276Z" 
          fill={getFillColor()}
        />
      </svg>
    </Icon>
  ) 
}

export const TypeIcon = ({ pathName ,boxSize} : MyIconProps & IconProps) => {
  //get fill colors
  const ctx = useContext(Ctx)
  //determine fill color 
  const location = useLocation()

  const getFillColor = () => pathName === location.pathname ? ctx.topSvgFillColor : ctx.topSvgDefaultColor

  return (
    <Icon boxSize={boxSize}>
      <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" 
          clipRule="evenodd" 
          d="M20.728 4.81542C19.5759 3.67137 18.2068 2.76897 16.7011 2.16119C15.1955 1.5534 13.5836 1.25248 11.9601 1.27607C8.91241 1.26845 5.98651 2.47184 3.82607 4.62151C1.66563 6.77117 0.447628 9.69103 0.440009 12.7387C0.43239 15.7864 1.63578 18.7123 3.78544 20.8728C5.93511 23.0332 8.85496 24.2512 11.9027 24.2588C12.5594 24.27 13.2012 24.0628 13.7274 23.6697C14.2536 23.2766 14.6344 22.7199 14.81 22.087C14.9219 21.6299 14.9207 21.1524 14.8066 20.6959C14.6925 20.2394 14.4688 19.8176 14.155 19.4669C14.0824 19.3844 14.0351 19.2827 14.0185 19.174C14.002 19.0653 14.017 18.9542 14.0618 18.8537C14.1066 18.7533 14.1792 18.6679 14.2711 18.6075C14.363 18.5471 14.4702 18.5144 14.5802 18.5132H16.4762C18.2608 18.5215 19.9824 17.8544 21.2954 16.6458C22.6085 15.4372 23.4157 13.7767 23.5549 11.9975C23.5977 10.671 23.369 9.34968 22.8829 8.11467C22.3968 6.87965 21.6635 5.75695 20.728 4.81542ZM16.5222 16.2149H14.6261C14.0724 16.2117 13.5296 16.3693 13.0637 16.6686C12.5978 16.9678 12.2287 17.3958 12.0012 17.9007C11.7737 18.4055 11.6976 18.9656 11.7821 19.5128C11.8666 20.0601 12.1081 20.5711 12.4772 20.9838C12.5491 21.0563 12.5999 21.147 12.6242 21.2462C12.6485 21.3454 12.6454 21.4493 12.6151 21.5469C12.5577 21.7882 12.2934 21.9376 11.9371 21.9606C10.6321 21.9438 9.34555 21.6494 8.16312 21.0969C6.98068 20.5444 5.92945 19.7464 5.07935 18.7561C4.22925 17.7657 3.59977 16.6057 3.23277 15.3532C2.86577 14.1007 2.76968 12.7844 2.95088 11.4919C3.27857 9.31998 4.3638 7.33391 6.01463 5.88496C7.66546 4.43602 9.77552 3.61756 11.9716 3.57435H12.0635C13.363 3.55734 14.6528 3.80074 15.8567 4.2902C17.0606 4.77966 18.1543 5.50527 19.0733 6.42421C19.7904 7.14173 20.3538 7.99779 20.7291 8.94019C21.1045 9.88259 21.284 10.8916 21.2566 11.9056C21.1377 13.0812 20.5885 14.1715 19.7146 14.9669C18.8408 15.7623 17.7038 16.2067 16.5222 16.2149ZM12.0632 8.17092C13.0152 8.17092 13.7869 7.39919 13.7869 6.44721C13.7869 5.49524 13.0152 4.72351 12.0632 4.72351C11.1112 4.72351 10.3395 5.49524 10.3395 6.44721C10.3395 7.39919 11.1112 8.17092 12.0632 8.17092ZM15.1145 7.98187C15.2652 7.67617 15.5032 7.42202 15.7983 7.25153C15.9945 7.13822 16.211 7.06469 16.4356 7.03513C16.6602 7.00557 16.8884 7.02057 17.1072 7.07927C17.326 7.13797 17.5311 7.23921 17.7107 7.37722C17.8903 7.51522 18.041 7.68728 18.1541 7.88355C18.3242 8.17888 18.403 8.51801 18.3805 8.8581C18.3579 9.19819 18.2351 9.52397 18.0274 9.79424C17.8198 10.0645 17.5367 10.2672 17.2139 10.3766C16.8911 10.486 16.5431 10.4972 16.2139 10.4089C15.8847 10.3206 15.5891 10.1367 15.3644 9.88038C15.1397 9.62409 14.9961 9.30694 14.9516 8.96902C14.9071 8.63109 14.9638 8.28757 15.1145 7.98187ZM8.32889 7.25159C8.03357 7.08143 7.69443 7.00265 7.35434 7.02519C7.01425 7.04773 6.68848 7.17059 6.4182 7.37824C6.14792 7.58589 5.94527 7.86901 5.83586 8.1918C5.72645 8.5146 5.71519 8.86259 5.80351 9.19178C5.89183 9.52098 6.07577 9.8166 6.33206 10.0413C6.58835 10.266 6.90551 10.4096 7.24343 10.4541C7.58135 10.4986 7.92487 10.4419 8.23057 10.2911C8.53627 10.1404 8.79043 9.90246 8.96091 9.60733C9.07422 9.41118 9.14776 9.19462 9.17731 8.97004C9.20687 8.74545 9.19187 8.51724 9.13317 8.29846C9.07448 8.07968 8.97323 7.87461 8.83522 7.69498C8.69722 7.51535 8.52516 7.36468 8.32889 7.25159ZM4.72182 12.6944C4.85072 12.3785 5.07044 12.108 5.35317 11.9171C5.5399 11.7892 5.75015 11.6996 5.97175 11.6534C6.19335 11.6073 6.42189 11.6055 6.64417 11.6483C6.86645 11.691 7.07804 11.7774 7.26672 11.9024C7.45539 12.0275 7.6174 12.1887 7.74337 12.3768C7.93513 12.6589 8.03885 12.9916 8.04141 13.3327C8.04396 13.6739 7.94524 14.0081 7.75774 14.2931C7.57023 14.5781 7.30238 14.801 6.9881 14.9337C6.67381 15.0663 6.32723 15.1028 5.99223 15.0383C5.65723 14.9739 5.34888 14.8115 5.10622 14.5718C4.86356 14.332 4.6975 14.0256 4.62907 13.6914C4.56065 13.3572 4.59293 13.0102 4.72182 12.6944Z"
          fill={getFillColor()}
        />
      </svg>
    </Icon>
  ) 
}

export const LetterIcon = ({ pathName , boxSize } : MyIconProps & IconProps) => {
  //get fill colors
  const ctx = useContext(Ctx)
  //determine fill color 
  const location = useLocation()

  const getFillColor = () => pathName === location.pathname ? ctx.topSvgFillColor : ctx.topSvgDefaultColor

  return (
    <Icon boxSize={boxSize}>
      <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" 
          clipRule="evenodd" 
          d="M3.86714 12.7738C3.22218 12.813 2.57405 12.8452 1.93203 12.8383C1.65691 12.8347 1.37916 12.7532 1.12816 12.6598C0.65868 12.4885 0.519727 12.1764 0.713475 11.714C0.826277 11.4394 0.986852 11.1713 1.175 10.9315C1.90342 10.0046 2.83731 9.27043 3.80176 8.57605C5.88321 7.07877 8.14325 5.88663 10.5554 4.79131C13.1104 3.68579 15.7852 2.69574 18.6043 2.21204C19.389 2.07791 20.1883 2.03953 20.981 2.00146L21.0582 1.99775C21.3788 1.98327 21.7094 2.05401 22.0121 2.14361C22.597 2.31488 22.7766 2.67511 22.4999 3.21502C22.292 3.62169 22.0074 4.00483 21.7056 4.36359C21.4765 4.6365 21.2048 4.87898 20.9337 5.1209C20.876 5.1724 20.8183 5.22386 20.7611 5.2756C20.6727 5.35553 20.5424 5.41786 20.4242 5.44053C16.9365 6.08304 13.6377 7.30818 10.4425 8.85257C8.27273 9.90194 6.227 11.1483 4.3136 12.6006C4.19236 12.6931 4.01699 12.7647 3.86714 12.7738ZM23.1663 3.86732L23.3736 4.33278C23.466 4.54025 23.5574 4.74849 23.6489 4.95682C23.8712 5.46301 24.0937 5.96969 24.3302 6.46691C24.4915 6.80535 24.4588 7.12549 24.2823 7.45841C23.9216 8.13613 23.3715 8.67167 22.7928 9.18146C21.4572 10.3573 19.982 11.3539 18.4046 12.193C18.042 12.3865 17.6786 12.5782 17.3136 12.7664C18.3448 13.1577 19.2253 13.9453 19.7097 15.0331C20.6744 17.2 19.6999 19.7387 17.5331 20.7035C15.3662 21.6682 12.8275 20.6936 11.8627 18.5268C11.3871 17.4586 11.3848 16.3014 11.7615 15.2853C9.83456 16.0065 7.85736 16.562 5.81456 16.8454C5.0856 16.9456 4.34032 16.9419 3.60791 16.9239C2.9863 16.9101 2.54847 16.637 2.32608 16.0415C2.11607 15.4761 1.86276 14.9278 1.60475 14.3694C1.49294 14.1274 1.38025 13.8835 1.26982 13.6355C3.39721 13.9021 5.42719 13.4171 7.45078 12.8602C9.84436 12.1984 12.147 11.2843 14.3837 10.203C16.8544 9.00893 19.2282 7.65933 21.3259 5.89624C22.0224 5.31046 22.6541 4.67022 23.1663 3.86732ZM15.7575 18.3954C15.9108 18.7396 16.3154 18.895 16.6596 18.7417C17.0038 18.5885 17.1592 18.1838 17.0059 17.8396C16.8527 17.4954 16.448 17.3401 16.1038 17.4933C15.7596 17.6466 15.6043 18.0512 15.7575 18.3954ZM15.9909 17.2445C17.1537 16.7268 18.1177 15.7676 18.6085 14.4892L17.6961 14.1389C16.9075 16.1931 14.5962 17.2222 12.542 16.4336L12.1918 17.346C13.4702 17.8368 14.8281 17.7622 15.9909 17.2445Z"
          fill={getFillColor()}
        />
      </svg>
    </Icon>
  ) 
}

export const HospitalIcon = ({ pathName , boxSize} : MyIconProps & IconProps) => {
  //get fill colors
  const ctx = useContext(Ctx)
  //determine fill color 
  const location = useLocation()

  const getFillColor = () => pathName === location.pathname ? ctx.topSvgFillColor : ctx.topSvgDefaultColor

  return (
    <Icon boxSize={boxSize}>
      <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" 
          clipRule="evenodd" 
          d="M16.8 6.76704L20.4 6.76704C22.392 6.76704 24 8.37504 24 10.367L24 19.967C24 21.959 22.392 23.567 20.4 23.567L3.6 23.567C1.608 23.567 0 21.959 0 19.967L0 10.367C0 8.37504 1.608 6.76704 3.6 6.76704H7.2V4.96704C7.2 3.31104 8.544 1.96704 10.2 1.96704L13.8 1.96704C15.456 1.96704 16.8 3.31104 16.8 4.96704V6.76704ZM10.2 4.36704C9.864 4.36704 9.6 4.63104 9.6 4.96704V6.76704L14.4 6.76704V4.96704C14.4 4.63104 14.136 4.36704 13.8 4.36704H10.2ZM20.4 21.167C21.06 21.167 21.6 20.627 21.6 19.967L21.6 10.367C21.6 9.70704 21.06 9.16704 20.4 9.16704L3.6 9.16704C2.94 9.16704 2.4 9.70704 2.4 10.367L2.4 19.967C2.4 20.627 2.94 21.167 3.6 21.167L20.4 21.167ZM13.1399 13.6911H15.2879C15.6479 13.6911 15.9359 13.9791 15.9359 14.3391V15.3231C15.9359 15.6831 15.6479 15.9711 15.2879 15.9711H13.1399V18.1191C13.1399 18.4791 12.8519 18.7671 12.4919 18.7671H11.5079C11.1479 18.7671 10.8599 18.4791 10.8599 18.1191V15.9711H8.71191C8.35191 15.9711 8.06391 15.6831 8.06391 15.3231V14.3391C8.06391 13.9791 8.35191 13.6911 8.71191 13.6911H10.8599V11.5431C10.8599 11.1831 11.1479 10.8951 11.5079 10.8951H12.4919C12.8519 10.8951 13.1399 11.1831 13.1399 11.5431V13.6911Z"
          fill={getFillColor()}
        />
      </svg>
    </Icon>
  ) 
}