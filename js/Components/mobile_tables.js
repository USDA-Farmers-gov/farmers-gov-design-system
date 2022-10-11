window.addEventListener("load", function () {
  processMobileTables();
});

window.addEventListener("resize", function () {
  processMobileTables();
});

function processMobileTables() {
  const tables = document.querySelectorAll("table");
  if (!!tables) {
    tables.forEach((table) => {
      const headers = table.querySelectorAll("thead th");
      const dataRows = table.querySelectorAll("tr");
      const headersInData = table.querySelectorAll("tbody th");
      const simpleTable = checkIfSimpleTable(
        table,
        headers,
        dataRows,
        headersInData
      );
      if (
        table.classList.contains("mobile-static-column") &&
        !table.closest(".mobile-static-column-container")
      ) {
        const tableStaticCol = table.cloneNode(true);
        const newDiv = document.createElement("div");

        tableStaticCol.classList.add("show-on-mobile");

        newDiv.classList.add("mobile-static-column-container");
        newDiv.appendChild(tableStaticCol);

        table.after(newDiv);
        table.remove();
        return;
      }
      if (!simpleTable) {
        if (table.classList.contains("mobile-static-column")) return;
        table.classList.add("show-on-mobile");
        table.classList.add("complex-table");
      }
      if (!!simpleTable) setupTableForMobile(table);

      setTimeout(function () {
        if (!table.classList.contains("show-on-mobile"))
          table.classList.add("show-on-mobile");
      }, 2000);
    });
  }
}

function setupTableForMobile(table) {
  if (table.classList.contains("mobile-static-column")) return;
  table.classList.add("simple-table");
  const rows = table.querySelectorAll("tr");
  let headerData = [];

  if (!!rows) {
    rows.forEach((row) => {
      const headerCells = row.querySelectorAll("th");
      const tableCells = row.querySelectorAll("td");

      if (tableCells.length <= 2) table.classList.remove("simple-table");

      if (!!headerCells.length) {
        headerData = [];

        headerCells.forEach((th) => {
          headerData.push(th.textContent.trim());
        });
      }
      if (!!tableCells) {
        tableCells.forEach((td, idx) => {
          td.setAttribute("data-th", headerData[idx]);
        });
      }
    });
  }
}

function checkIfSimpleTable(table, headers, dataRows, headersInData) {
  let integer = 0;
  // console.log(headersInData);
  // if (headersInData.length) integer++;

  if (!!table && table.classList.contains("ui-datepicker-calendar")) integer++;

  headers.forEach(function (header) {
    if (header.hasAttribute("colspan") || header.hasAttribute("rowspan"))
      integer++;
  });

  dataRows.forEach(function (row) {
    const dataHeaders = row.querySelectorAll("th");
    const dataCells = row.querySelectorAll("td");

    if (checkForColAndRowSpan(dataHeaders)) integer++;
    if (checkForColAndRowSpan(dataCells)) integer++;
  });
  return integer === 0 ? true : false;
}

function checkForColAndRowSpan(elements) {
  let integer = 0;
  elements.forEach(function (element) {
    if (element.hasAttribute("colspan") || element.hasAttribute("rowspan"))
      integer++;
  });
  return !!integer ? true : false;
}
