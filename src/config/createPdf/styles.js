/* eslint-disable max-len */

const pageBreak = `
  page-break-before: auto;
  page-break-after: auto;
  page-break-inside: avoid;
`;

const styles = {
  commonStyles: `
    .page-break {
      ${pageBreak}
      padding-top: 50px;
    }
    .page-break-auto {
      ${pageBreak}
    }
    body {
      -webkit-print-color-adjust: exact;
      float: none;
      background: white;
      padding: 0px;
      margin: 0px;
    }
    a {
      text-decoration: none;
    }
    #page {
      padding-top: 30px;
      width: 100%;
      border-style: solid;
      border-width: 0px;
      border-color: black;
      justify-content: center;
      align-items: center;
      display: flex;
      background: white;
    }
    #main {
      width: 100%;
      padding-left: 40px;
      padding-right: 40px;
      font-family: "Clan Pro News";
      font-weight: 100;
      font-size: 12px;
      background: white;
      font-weight: normal;
    }
    .bold {
      font-weight: bold;
    }
    .line {
      width: 100%;
      background: #e3e3e3;
      height: 2px;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    h5 {
      margin-bottom: 0px;
    }
    .small {
      font-size: 10px;
    }
    .medium {
      font-size: 11px;
    }
    h3 {
      /* margin-bottom: 0px; */
    }
    h4 {
      font-size: 12px;
      margin-bottom: 0px;
    }
    .row {
      display: flex;
      flex-direction: row;
    }
    .column {
      display: flex;
      flex-direction: column;
    }
  `,
  productDetails: `
    .section1 {
      padding-top: 30px;
      ${pageBreak}
    }
    .equipment-sec {
      padding-top: 30px;
      ${pageBreak}
    }
    .icon-sec {
      padding-top: 30px;
      ${pageBreak}
    }
    .table {
      display: table;
      border-spacing: 0px;
      border-color: white;
      border-collapse: collapse;
    }
    .table tr:nth-child(odd) {
      background-color: #e3e3e3;
    }
    .table td {
      padding: .5rem;
    }
    .image-small {
      width: 75px;
      height: 75px;
      padding: .5em;
    }
    .card {
      background: #e3e3e3;
      padding: 0px;
      padding-left: 30px;
      padding-right: 30px;
      width: 40%;
    }
    .feature-benifit-sec-1 {
      padding-top: 30px;
      ${pageBreak}
    }
    .feature-benifit-sec-2 {
      justify-content: space-between;
      padding-top: 30px;
      ${pageBreak}
    }
    .compatible-machines-sec {
      padding-top: 30px;
      ${pageBreak}
    }
    .compatible-machines-current {
      padding-top: 30px;
      ${pageBreak}
    }
    .compatible-machines-past {
      padding-top: 30px;
      ${pageBreak}
    }
    .compatible-machines-sec ul {
      margin: 0
    }
    .applications-sec {
      padding-top: 30px;
      ${pageBreak}
    }
    .detergent-warnings-sec {
      padding-top: 30px;
      ${pageBreak}
    }
    .configurable-component-sec {
      padding-top: 30px;
      ${pageBreak}
    }
    .cleaning_agents_and_accessories_sec {
      padding-top: 30px;
      ${pageBreak}
    }
    .technical-data-sec {
      padding-top: 30px;
      ${pageBreak}
    }
  `,
  manualContent: `
    table {
      display: table;
      border-spacing: 0px;
      border-color: white;
      border-collapse: collapse;
      word-break: break-all;
    }
    .table tr:nth-child(odd) {
      background-color: #e3e3e3;
    }
    .table td {
      padding: .5rem;
    }
    .image-small {
      width: 75px;
      height: 75px;
      padding: .5em;
    }
    .card-row-wrap {
      padding-top: 25px;
      background-color: #FFF;
    }
    .card-wrap {
      display: flex;
      flex-direction: row;
      background-color: #FFF;
      ${pageBreak}
    }
    .card-wrap .card {
      flex: 1;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #FFF;
    }
    img {
      object-fit: contain;
      width: 100%;
      height: auto;
      background-color: #FFF;
    }
    .ribbon-text {
      margin-top: 15px;
      padding: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
      background-color: #FFED00;
      ${pageBreak}
    }
    .full-img-wrap {
      padding-top: 25px;
      ${pageBreak}
    }
    .full-img {
      object-fit: contain;
      width: 100%;
      height: auto;
    }
    .headline-text {
      padding-top: 25px;
      ${pageBreak}
    }
    .img-headline-fifty-fifty {
      display: flex;
      flex-direction: row;
      padding-top: 25px;
      ${pageBreak}
    }
    .img-headline-fifty-fifty .img-wrap {
      flex: 1;
    }
    .img-headline-fifty-fifty .desc-wrap {
      flex: 1;
      padding-left: 10px;
      padding-right: 10px;
    }
    .image-grid {
      display: flex;
      flex-direction: row;
      padding-top: 25px;
      ${pageBreak}
    }
    .image-grid .image-big {
      flex: 7;
      position: relative;
    }
    .image-grid .image-big h1 {
      position: absolute;
      top: 10px;
      left: 10px;
      color: #ffff;
      z-index: 1000;
    }
    .image-grid .image-small-wrap {
      flex: 3;
      display: flex;
      flex-direction: column;
    }
    .image-grid .image-small {
      flex: 1;
      width: 100%;
      margin-bottom: 6px;
      padding: 0;
      margin-left: 10px;
      position: relative;
    }
    .image-grid .image-small img {
      object-fit: cover;
      height: 100%;
    }
    .image-grid .image-small span {
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-weight: 700;
      color: #fff;
      z-index: 9999;
    }
    .image-grid .image-small:last-child {
      margin-bottom: 0;
    }
    .text-content {
      margin-top: 25px;
      ${pageBreak}
    }
    .image-headline-text-wrap {
      margin-top: 25px;
      ${pageBreak}
    }
    .horizontal-rule {
      margin-top: 25px;
      width:100%;
      background:gray;
      height: 1.5px;
      page-break-after: always;
    }
    .table-wrap {
      padding-top: 25px;
      ${pageBreak}
    }
    .table-wrap-table {
      page-break-inside: auto;
    }
    .table-wrap-tbody {
      vertical-align: top;
    }
    .table-wrap-tr {
      ${pageBreak}
    }
    .table-tr-data {
      ${pageBreak}
    }
  `,
  productCompare: `
  .compare-wrap {
  }
  .compare-row {
    display: flex;
    flex-direction: row;
  }
  .compare-col {
    flex: 1;
  }
  .compare-wrap .compare-row {
    padding: 10px 0;
    ${pageBreak}
  }
  .compare-wrap .compare-row label{
    font-size: 10px;
  }
  .compare-wrap .compare-row:nth-child(odd) {
    background: #F8F8F8;
  }
  .compare-wrap .compare-col {
    padding: 0 5px;
  }
  .compare-col img {
  height: 130px;
    width: 100%;
    object-fit: contain;
    margin-top: 10px;
  }
  .compare-wrap .compare-col img {
    height: 12px;
    width: 12px;
  }
  .compare-col span {
    margin-top: 10px;
    float: left;
  }
  h4 {
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .desc-wrap {
    padding-top: 30px;
    ${pageBreak}
  }
  .section {
    ${pageBreak}
    padding-top: 20px;
  }
  `,
  productList: `
  .ribbon-text {
    margin-top: 20px;
    padding: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #FFED00;
  }
  .ribbon-text h1 {
    margin-top: 0px;
    margin-bottom: 5px;
  }

  .product-list-wrap {
    width: 100%;
  }
  .product-row {
    padding-top: 30px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .product-item {
    width: 25%;
    padding: 0px 10px;
    box-sizing: border-box;
  }
  .product-item h4 {
    font-size: 14px;
  }
  .product-item h5 {
    font-size: 12px;
    font-weight: bold;
    margin: 2px 0;
  }
  .product-item img {
    height: 150px;
    width: 100%;
    object-fit: contain;
  }
  .product-item .product-group-img {
    height: auto;
    max-height: 150px;
    width: 100%;
    object-fit: contain;
  }
  .product-item p {
    margin-bottom: 0;
    font-size: 12px;
  }
  `
};

export default styles;
