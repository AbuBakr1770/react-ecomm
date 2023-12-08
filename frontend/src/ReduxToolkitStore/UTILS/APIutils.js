import axios from "axios";

// export const getData = async (
//   currentPage,
//   resultPerPage,
//   price,
//   catagory,
//   keyword
// ) => {
     
//   const { data } = await axios.get(
//     `/api/v1/products?keyword=${keyword}&page=${currentPage}&limit=${resultPerPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
//   );

//   return data;
// };

export const getData = async (
    currentPage,
    resultPerPage,
    price,
    category,
    keyword,
    ratings
  ) => {
    // Initialize an empty array to store URL parameters
    const params = [];
  
    if (currentPage) {
      params.push(`page=${currentPage}`);
    }
  
    if (resultPerPage) {
      params.push(`limit=${resultPerPage}`);
    }
  
    if (price && price.length === 2) {
      params.push(`price[gte]=${price[0]}`);
      params.push(`price[lte]=${price[1]}`);
    }
  

  
    if (keyword && keyword.trim() !== '') {
      params.push(`keyword=${keyword}`);
    }
  
    if (category && typeof category === 'string' && category.length > 0) {
              params.push(`category=${category.toLowerCase()}`);
      }

      if (ratings) {
        params.push(`ratings[gte]=${ratings}`);
}
    
    // Join the parameters array with "&" to create the query string
    const queryString = params.join('&');
  
    // Construct the full URL with the query string
    const url = `/api/v1/products${queryString ? `?${queryString}` : ''}`;
  
    const { data } = await axios.get(url);
  
    return data;
  };
  



export const getProductDetail = async (id) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  return data.product;
};

export const loginUserFun = async (email,password) =>{

  const config = {Headers : {'Content-Type':'application/json'}}

  const {data} = await axios.post(`/api/v1/login`,{email,password},config)

  // console.log(`logged in data is `,data.user);

  const loggedUser = data.user

  return loggedUser

}
