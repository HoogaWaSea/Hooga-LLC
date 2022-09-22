"use strict";
(function() {

  window.addEventListener("load", init);
  const BASE_URL = "/products";

  function init() {
    getProducts();
    id("search-bar").addEventListener("input", enableSearchBtn);
    id("search-btn").addEventListener("click", getProducts);
    id("login-btn").addEventListener("click", login);
    id("order-btn").addEventListener("click", getOrders);
    id("cart-btn").addEventListener("click", getCartItems);
    id("grid-btn").addEventListener("click", switchLayout);
    id("laptop").addEventListener("click", requestLaptop);
    id("smartphone").addEventListener("click", requestSmartphone);
    id("smartwatch").addEventListener("click", requestSmartwatch);
    id("tv").addEventListener("click", requestTV);
    id("gameconsole").addEventListener("click", requestGameconsole);
    id("tablet").addEventListener("click", requestTablet);
  }

  function requestLaptop() {
    fetch("/products/laptop")
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);

  function requestSmartphone() {
    fetch("/products")
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);

  function requestSmartwatch() {
    fetch("/products")
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);

  function requestTV() {
    fetch("/products")
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);

  function requestGameconsole() {
    fetch("/products")
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);

  function requestTablet() {
    fetch("/products")
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);


      async function statusCheck(response) {
        if (!response.ok) {
          throw new Error(await response.json());
        }
        return response;
      }
  
      function processData(responseData) {
        if (id("search-bar").value.trim().length > 0) {
          // display only the products related to the search keyword
          displaySearchedProducts(responseData);
        } else {
          // display all the products
          displayAllProducts(responseData);
        }
        id("search-btn").disabled = true;
      }
    }
  
    function login() {
      let data = new FormData();
      data.append("username", username);
      data.append("password", password);
      fetch("/login", {method: "POST", body: data})
        .then(statusCheck)
        .then(resp => resp.text())
        .then(processData)
        .catch(handleError);



        async function statusCheck(response) {
          if (!response.ok) {
            throw new Error(await response.text());
          }
          return response;
        }
    
        function processData(responseData) {
    
        }
      }
    
      function signUp() {
        let data = new FormData();
        data.append("email", email);
        data.append("username", username);
        data.append("password", password);
        fetch("/signup", {method: "POST", body: data})
          .then(statusCheck)
          .then(resp => resp.text())
          .then(processData)
          .catch(handleError);

      
          async function statusCheck(response) {
            if (!response.ok) {
              throw new Error(await response.text());
            }
            return response;
          }
      
          function processData(responseData) {
      
          }
        }
      
        function addToCart() {
          let data = new FormData();
          data.append("product", product);
          fetch("/signup", {method: "POST", body: data})
            .then(statusCheck)
            .then(resp => resp.text())
            .then(processData)
            .catch(handleError);

        
            async function statusCheck(response) {
              if (!response.ok) {
                throw new Error(await response.text());
              }
              return response;
            }
        
            function processData(responseData) {
        
            } 

            function handleError(error) {
              console.log(error);
            }
              
       