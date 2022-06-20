/**
 * @fileoverview This is api service to get media urls
 * @return {object} Url or images to be stored in local device
 */
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';
import { globalSearch } from '../realm/queries';

const { apiNames } = appConstants;
const { GET_CLIENT } = globals;

const searchData = async (searchStr) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  const query = gql`
      {
        search(
          q: "${searchStr}",
          languageCode: "${activeLanguageData.languageCode}",
          countryCode: "${activeLanguageData.countryCode}",
          year:${globals.CURRENT_YEAR}
        ){
          buckets{
            accessories{
              doc_count,
              items{
                _source{
                  id,
                  name,
                  partnumber,
                  partnumberFormatted,
                  productType,
                  images{
                    title,
                    type,
                    urls{
                      type,
                      url
                    }
                  },
                  texts{
                    value,
                    type
                  }
                }
              }
            },
             detergents{
              doc_count,
              items{
                _source{
                  id,
                  name,
                  partnumber,
                  partnumberFormatted,
                  productType,
                  images{
                    title,
                    type,
                    urls{
                      type,
                      url
                    }
                  }
                }
              }
            },
            content{
              doc_count,
              items{
                headline,
                pageId
              }
            },
            hg{
              doc_count,
              items{
                _source{
                  id,
                  name,
                  partnumber,
                  partnumberFormatted,
                  productType,
                  images{
                    title,
                    type,
                    urls{
                      type,
                      url
                    }
                  }
                }
              }
            },
            pro{
              doc_count,
              items{
                _source{
                  id,
                  name,
                  partnumber,
                  partnumberFormatted,
                  productType,
                  images{
                    title,
                    type,
                    urls{
                      type,
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

  const isNetConnected = await helpers.isNetConnected();
  return new Promise(async (resolve, reject) => {
    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.SEARCH).query({ query }).then(({ data }) => {
        resolve(data.search.buckets);
      }).catch((err) => {
        reject(err);
      });
    } else {
      const result = await globalSearch(searchStr);
      resolve(result);
    }
  });
};

export default searchData;
