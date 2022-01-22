export const isBadUrl = async url => {
  try {
    const res = await fetch(url)
    return res.status >= 400 
  } catch (error) {
    console.log(error)
  }
}