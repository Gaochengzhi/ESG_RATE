// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function handler(req, res) {
    const url = "http://47.106.13.220:8081/esg/queryIndicatorData";
    const data = { companyName: "金洲慈航集团股份有限公司" };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
