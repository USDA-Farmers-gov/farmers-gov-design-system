window.addEventListener("load", function () {
  setTimeout(() => {
    saveTableWidths();
    processMobileTables();
  }, "1500");
});

window.addEventListener("resize", function () {
  processMobileTables();
});

function saveTableWidths() {
  const key = "ds_table_widths";
  sessionStorage.removeItem(key);
  const tables = document.querySelectorAll("table");
  let widths = [];
  tables.forEach((table, idx) => {
    widths.push({
      index: idx,
      tableWidth: table.getBoundingClientRect().width,
    });
  });
  sessionStorage.setItem(key, JSON.stringify(widths));
}

function processMobileTables() {
  const tables = document.querySelectorAll("table");
  if (!!tables.length) {
    tables.forEach((table, idx) => {
      if (
        !!table.classList &&
        table.classList.contains("mobile-static-column")
      ) {
        processStaticColTable(table, idx);
        setupStaticColContainer(table);
      }

      const headers = table.querySelectorAll("thead th");
      const dataRows = table.querySelectorAll("tr");
      const headersInData = table.querySelectorAll("tbody th");
      const simpleTable = checkIfSimpleTable(
        table,
        headers,
        dataRows,
        headersInData
      );

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

function processStaticColTable(table, idx) {
  const staticColClass = "show-mobile-static-column";
  const widths = JSON.parse(sessionStorage.getItem("ds_table_widths"));
  const bodyWidth = document.body.getBoundingClientRect().width;

  table.classList.add("full-width");

  // if the table goes outside of the body container, add class
  // to activate static column
  if (
    widths[idx].tableWidth > bodyWidth &&
    table.getBoundingClientRect().width > bodyWidth
  )
    table.classList.add(staticColClass);

  // if the table is inside of the body container, remove class
  // for static column
  if (
    widths[idx].tableWidth < bodyWidth &&
    table.getBoundingClientRect().width < bodyWidth
  )
    table.classList.remove(staticColClass);

  // if there's a large margin between the table and right
  // margin of the body, remove the static column class
  if (
    bodyWidth - table.getBoundingClientRect().width > 50 &&
    !!table.classList.contains("show-mobile-static-column")
  )
    table.classList.remove(staticColClass);
}

function setupStaticColContainer(table) {
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

      // if (tableCells.length <= 2) table.classList.remove("simple-table");

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

  if (!!table.classList && table.classList.contains("ui-datepicker-calendar"))
    integer++;

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
