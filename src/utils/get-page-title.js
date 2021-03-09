import defaultSettings from '@/settings'

const title = defaultSettings.title || '科技文章检索系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
