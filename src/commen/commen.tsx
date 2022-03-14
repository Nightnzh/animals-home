
import pairIcon from "../asset/icon/card.svg"
import favoriteIcon from "../asset/icon/favorites.svg"
import typeIcon from "../asset/icon/collar.svg"
import hospitalIcon from "../asset/icon/hospital.svg"
import letterIcon from "../asset/icon/color.svg"




export const routes = [
  {
    path : "/",
    icon : `${pairIcon}`,
    tit : "配對",
    component : <></>
  },
  {
    path : "/favorite",
    icon : `${favoriteIcon}`,
    tit : "收藏",
    component : <></>
  },
  {
    path : "/type",
    icon : `${typeIcon}`,
    tit : "主題",
    component : <></>
  },
  {
    path : "/letter",
    icon : `${letterIcon}`,
    tit : "送養",
    component : <></>
  },
  {
    path : "/animal-hospital",
    icon : `${hospitalIcon}`,
    tit : "急診",
    component : <></>
  },
]

