global.wait = (data) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data));
  });
