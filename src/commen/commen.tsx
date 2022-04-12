import { FavoriteIcon, HospitalIcon, LetterIcon, PairIcon, TypeIcon } from "../component/Icons";
import { Fav } from "../page/fav";
import {  HosSection } from "../page/hos";
import { Pair } from "../page/pair";
import {Send} from "../page/send";
import { TestN } from "../testcomponent/TestComponent";



export const routes = [
  {
    path: "/",
    icon: PairIcon,
    iconObj: PairIcon,
    tit: "配對",
    component: <Pair/>
  },
  {
    path: "/favorite",
    icon: FavoriteIcon,
    iconObj: FavoriteIcon,
    tit: "收藏",
    component: <Fav/>
  },
  // {
  //   path: "/type",
  //   icon: TypeIcon,
  //   iconObj: TypeIcon,
  //   tit: "主題",
  //   component: <></>
  // },
  {
    path: "/send",
    icon: LetterIcon,
    iconObj: LetterIcon,
    tit: "送養",
    component: <Send />
  },
  {
    path: "/animal-hospital",
    icon: HospitalIcon,
    iconObj: HospitalIcon,
    tit: "急診",
    component: <HosSection/>
  },
]

