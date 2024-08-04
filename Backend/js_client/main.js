fetch("http://127.0.0.1:8000/orders/?limit=1&page=1")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
