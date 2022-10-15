import path from 'path';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'

const foods =[
  
    {
      "id":"1",
      "i18n":"สันนอกสไลด์",
      "src":"1.webp",
      "category":"meat",
      "sub-catagory":"pork"
    },    {
      "id":"2",
      "i18n":"สามชั้นสไลด์",
      "src":"2.webp",
      "category":"meat",
      "sub-catagory":"pork"
    },    {
      "id":"3",
      "i18n":"คุโรบูตะสไลด์",
      "src":"3.webp",
      "category":"meat",
      "sub-catagory":"pork"
    },    {
      "id":"4",
      "i18n":"หมูบดทรงเครื่อง",
      "src":"4.webp",
      "category":"meat",
      "sub-catagory":"pork"
    },    {
      "id":"5",
      "i18n":"หมูนุ่ม",
      "src":"5.webp",
      "category":"meat",
      "sub-catagory":"pork"
    },    {
      "id":"6",
      "i18n":"หมูนุ่มโรยงาน",
      "src":"6.webp",
      "category":"meat",
      "sub-catagory":"pork"
    },    {
      "id":"7",
      "i18n":"หมูชาบูพันเห็ดเข็มทอง",
      "src":"7.webp",
      "category":"meat",
      "sub-catagory":"pork"
    },    {
      "id":"8",
      "i18n":"ตับหมู",
      "src":"8.webp",
      "category":"meat",
      "sub-catagory":"pork"
    },    {
      "id":"9",
      "i18n":"เนื้อวัว",
      "src":"9.webp",
      "category":"meat",
      "sub-catagory":"beef"
    },    {
      "id":"10",
      "i18n":"เนื้อสไลด์นำเข้า",
      "src":"10.webp",
      "category":"meat",
      "sub-catagory":"beef"
    },    {
      "id":"11",
      "i18n":"เนื้อไก่สไลด์",
      "src":"11.webp",
      "category":"meat",
      "sub-catagory":"chicken"
    },    {
      "id":"12",
      "i18n":"   เนื้อปลาสด",
      "src":"12.webp",
      "category":"meat",
      "sub-catagory":"seafood"
    },    {
      "id":"13",
      "i18n":"   ปลาทรงเครื่อง",
      "src":"13.webp",
      "category":"meat",
      "sub-catagory":"seafood"
    },    {
      "id":"14",
      "i18n":" หัวปลา",
      "src":"14.webp",
      "category":"meat",
      "sub-catagory":"seafood"
    },    {
      "id":"15",
      "i18n":" กุุ้ง",
      "src":"15.webp",
      "category":"meat",
      "sub-catagory":"seafood"
    },    {
      "id":"16",
      "i18n":"หมึกสด",
      "src":"16.webp",
      "category":"meat",
      "sub-catagory":"seafood"
    },    {
      "id":"17",
      "i18n":"หมึกทรงเครื่อง",
      "src":"17.webp",
      "category":"meat",
      "sub-catagory":"seafood"
    },    {
      "id":"18",
      "i18n":"หมึกกรอบ",
      "src":"18.webp",
      "category":"meat",
      "sub-catagory":"seafood"
    },    {
      "id":"19",
      "i18n":"แมงกระพรุน",
      "src":"19.webp",
      "category":"meat",
      "sub-catagory":"seafood"
    },    {
      "id":"20",
      "i18n":"คริสตัลไข่ปลา",
      "src":"20.webp",
      "category":"meatballs"
    },    {
      "id":"21",
      "i18n":"ชิกูวะไส้ชีส",
      "src":"21.webp",
      "category":"meatballs"
    },    {
      "id":"22",
      "i18n":"ลูกชิ้นไข่เค็ม",
      "src":"22.webp",
      "category":"meatballs"
    },    {
      "id":"23",
      "i18n":"ลูกชิ้นกุ้ง",
      "src":"23.webp",
      "category":"meatballs"
    },    {
      "id":"24",
      "i18n":"ลูกชิ้นปลาแซลม่อน",
      "src":"24.webp",
      "category":"meatballs"
    },    {
      "id":"25",
      "i18n":"สาหร่ายทรงเครื่อง",
      "src":"25.webp",
      "category":"meatballs"
    },    {
      "id":"26",
      "i18n":"ชุดผักรวม",
      "src":"26.webp",
      "category":"vegatable"
    },    {
      "id":"27",
      "i18n":"ผักบุ้ง",
      "src":"27.webp",
      "category":"vegatable"
    },    {
      "id":"28",
      "i18n":"กวางตุ้ง",
      "src":"28.webp",
      "category":"vegatable"
    },    {
      "id":"29",
      "i18n":"ฮ่องเต้น้อย",
      "src":"29.webp",
      "category":"vegatable"
    },    {
      "id":"30",
      "i18n":"ขึ้นฉ่าย",
      "src":"30.webp",
      "category":"vegatable"
    },    {
      "id":"31",
      "i18n":"ปวยเล้ง",
      "src":"31.webp",
      "category":"vegatable"
    },    {
      "id":"32",
      "i18n":"เห็ดเข็มทอง",
      "src":"32.webp",
      "category":"vegatable"
    },    {
      "id":"33",
      "i18n":"เห็ดชิเมจิขาว",
      "src":"33.webp",
      "category":"vegatable"
    },    {
      "id":"34",
      "i18n":"เห็ดชิเมจิดำ",
      "src":"34.webp",
      "category":"vegatable"
    },    {
      "id":"35",
      "i18n":"เห็ดนางรมหลวง",
      "src":"35.webp",
      "category":"vegatable"
    },    {
      "id":"36",
      "i18n":"ข้าวโพดหวาน",
      "src":"36.webp",
      "category":"vegatable"
    },    {
      "id":"37",
      "i18n":"วากาเมะ",
      "src":"37.webp",
      "category":"vegatable"
    },    {
      "id":"38",
      "i18n":"เกี๊ยวกุ้ง",
      "src":"38.webp",
      "category":"other"
    },    {
      "id":"39",
      "i18n":"เกี๊ยวปลา",
      "src":"39.webp",
      "category":"other"
    },    {
      "id":"40",
      "i18n":"เต้าหู้ไข่",
      "src":"40.webp",
      "category":"other"
    },    {
      "id":"41",
      "i18n":"ฟองเต้าหู้",
      "src":"41.webp",
      "category":"other"
    },    {
      "id":"42",
      "i18n":"เต้าหู้ญี่ปุ่น",
      "src":"42.webp",
      "category":"other"
    },    {
      "id":"43",
      "i18n":"เต้าหู้ทอด",
      "src":"43.webp",
      "category":"other"
    },    {
      "id":"44",
      "i18n":"เส้นอุด้ง",
      "src":"44.webp",
      "category":"other"
    },    {
      "id":"45",
      "i18n":"วุ้นเส้น",
      "src":"45.webp",
      "category":"other"
    },    {
      "id":"46",
      "i18n":"ไข่",
      "src":"46.webp",
      "category":"other"
    },    {
      "id":"47",
      "i18n":"ขนมปังหน้ากุ้ง",
      "src":"47.webp",
      "category":"appetizer"
    },    {
      "id":"48",
      "i18n":"ขนมจีบหมู",
      "src":"48.webp",
      "category":"appetizer"
    },    {
      "id":"49",
      "i18n":"ก๋วยเตี๋ยวหลอด",
      "src":"49.webp",
      "category":"appetizer"
    },    {
      "id":"50",
      "i18n":"เฟรนช์ฟราย",
      "src":"50.webp",
      "category":"appetizer"
    },    {
      "id":"51",
      "i18n":"เฟรนช์ฟราย",
      "src":"51.webp",
      "category":"appetizer"
    },    {
      "id":"52",
      "i18n":"ปอเปี๊ยะ",
      "src":"52.webp",
      "category":"appetizer"
    },    {
      "id":"53",
      "i18n":"ไอศครีมช็อกโกแลตชิพ",
      "src":"53.webp",
      "category":"dessert"
    },    {
      "id":"54",
      "i18n":"ไอศครีมมะนาว",
      "src":"54.webp",
      "category":"dessert"
    },    {
      "id":"55",
      "i18n":"ไอศรีมสตอเบอร์รี",
      "src":"55.webp",
      "category":"dessert"
    },    {
      "id":"56",
      "i18n":"ไอศครีมชาเขียวถั่วแดง",
      "src":"56.webp",
      "category":"dessert"
    },    {
      "id":"57",
      "i18n":"ไอศครีมวานิลลาฟรุตสลัด",
      "src":"57.webp",
      "category":"dessert"
    },    {
      "id":"58",
      "i18n":"ทับทิมกรอบ",
      "src":"58.webp",
      "category":"dessert"
    },    {
      "id":"59",
      "i18n":"รวมมิตร",
      "src":"59.webp",
      "category":"dessert"
    },    {
      "id":"60",
      "i18n":"น้ำแข็งใส",
      "src":"60.webp",
      "category":"dessert"
    },    {
      "id":"61",
      "i18n":"แดงมะนาวโซดา",
      "src":"61.webp",
      "category":"drink"
    },    {
      "id":"62",
      "i18n":"กาแฟเย็น",
      "src":"62.webp",
      "category":"drink"
    },    {
      "id":"63",
      "i18n":"ชาไทยเย็น",
      "src":"63.webp",
      "category":"drink"
    },    {
      "id":"64",
      "i18n":"น้ำแตงโมปั่น",
      "src":"64.webp",
      "category":"drink"
    }
    ,    {
      "id":"65",
      "i18n":"น้ำมะนาว",
      "src":"65.webp",
      "category":"drink"
    },    {
      "id":"66",
      "i18n":"น้ำมะพร้าว",
      "src":"66.webp",
      "category":"drink"
    },    {
      "id":"67",
      "i18n":"น้ำส้ม",
      "src":"67.webp",
      "category":"drink"
    }

  ]


export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    res.status(200).json(foods);
  }