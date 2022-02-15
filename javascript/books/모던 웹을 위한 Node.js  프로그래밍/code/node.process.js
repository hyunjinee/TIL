process.argv.forEach((item, index) => {
  console.log(index + ": " + typeof item + ":", item);

  if (item == "--exit") {
    var exitTime = Number(process.argv[index + 1]);

    setTimeout(() => {
      process.exit();
    }, exitTime);
  }
});
