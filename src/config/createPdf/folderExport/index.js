import { Platform } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as globals from '../../libs/globals';


const folderExportPdf = (htmlStr, fileName) => new Promise(async (resolve) => {
  let options = {
    html: htmlStr,
    fileName: Platform.OS === 'ios' ? `${globals.APP_FOLDER}/${fileName}` : fileName,
    directory: 'Documents',
  };
  if (Platform.OS === 'ios') {
    options = {
      ...options,
      padding: 0,
      bgColor: '#FFFFFF'
    };
  }

  const file = await RNHTMLtoPDF.convert(options);
  FileViewer.open(file.filePath)
    .then(() => {
      resolve();
    }).catch(() => { });
});

export default folderExportPdf;
