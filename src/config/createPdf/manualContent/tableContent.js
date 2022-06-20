/**
 * @fileoverview Table section for Manual content pdf
 * @package
 */
const tableContent = (data) => {
  let str = '';
  data.forEach((row) => {
    str += '<tr class="table-wrap-tr">';
    row.forEach((item) => {
      str += `<td class="table-wrap-td" style="padding-left: 10px; line-height: 16px; padding-right: 10px; padding-top: 15px; padding-bottom: 15px; font-size: 12px; ${item.style}">`;
      str += item.value;
      str += '</td>';
    });
    str += '</tr>';
  });
  return `
    <div class="table-wrap">
      <table class="table-wrap-table">
        <tbody class="table-wrap-tbody">
          ${str}
        </tbody>
      </table>
    </div>
  `;
};

export default tableContent;
