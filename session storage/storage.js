
let fetchData ;

const fetchInfo = async () => {
   const resp = await fetch(`https://opentdb.com/api.php?amount=5`)
   const respJson = await resp.json()
    fetchData = respJson.results
    console.log(fetchData)

}
fetchInfo()

