import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BUCKET_CDN_ENDPOINT, BUCKET_ENDPOINT } from "../../config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getItemCDNURL(id: number, type: string) {
  let url = BUCKET_CDN_ENDPOINT + "/content"
  switch (type) {
    case "image":
      url += `/images/${id}`
      break
    case "video":
      url += `/videos/${id}`
      break
    case "pdf":
      url += `/pdfs/${id}`
      break
    default:
      return false
  }
  return url
}

export function getItemURL(id: number, type: string) {
  let url = BUCKET_ENDPOINT + "/content"
  switch (type) {
    case "image":
      url += `/images/${id}`
      break
    case "video":
      url += `/videos/${id}`
      break
    case "pdf":
      url += `/pdfs/${id}`
      break
    default:
      return false
  }
  return url
}