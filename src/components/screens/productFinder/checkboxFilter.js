/**
 * @fileoverview This is app's search page component.
 * It renders dynamic search page result
 * @package
 */
import React, { Component } from 'react';
import {
  View, Text, ScrollView, Image
} from 'react-native';
import { Tooltip } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import {
  FontIcon,
  TouchableDebounce
} from '../../custom';
import {
  appConstants,
  globals,
  colors,
  helpers,
  fonts,
  tr,
  appStyles, icons, appContexts, images
} from '../../../config';
import styles from './styles';
import CheckBoxItem from '../../custom/layoutManager/productList/filter/checkBoxItem';

let sliderValueInput;

class CheckboxFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExplainationIcon: false
    };
  }

  openCheckBoxGroup = () => {
    const { toggleCheckbox } = this.state;
    this.setState({ toggleCheckbox: !toggleCheckbox });
  }

  selectCheckboxFilter = (key) => {
    // console.log('key in select checkbox filter', key);
  }

  async finaliseAnswer(value, data, productFinderReducer, selectedIndex, slider, selectedItem, SelectedCheckBox, item) {
    const SendingData = [item];
    if (selectedItem.Answer) {
      await selectedItem.Answer.forEach((groupItem, groupIndex) => {
        if (groupItem.Translation_ID === item.Translation_ID) {
          SendingData.splice(item, 1);
          if (!SendingData.length) {
            this.props.selectedMultipleAnswers(value, data, productFinderReducer, selectedIndex, slider, SendingData);
          }
        } else {
          if (groupItem.value === 'Yes' || groupItem.value === 'No') {

          } else {
            SendingData.push(groupItem);
          }
          this.props.selectedMultipleAnswers(value, data, productFinderReducer, selectedIndex, slider, SendingData);
        }
      });
    } else {
      this.props.selectedMultipleAnswers(value, data, productFinderReducer, selectedIndex, slider, SendingData);
    }
  }

  renderGroup = (item, index, productFinderReducerData, QuestionItem, QuestionIndex) => {
    let SelectedCheckBox = [];
    const TranslationIdCheckingApi = item.Translation_ID;

    productFinderReducerData.arr.questions[QuestionIndex].Answer && productFinderReducerData.arr.questions[QuestionIndex].Answer.forEach((groupItem) => {
      if (groupItem.value === item.value) {
        SelectedCheckBox = item.value;
      }
    });

    return (
      <TouchableDebounce
        disabled={!item.Active}
        style={styles.checkboxGroupOverlay}
        onPress={() => {
          this.finaliseAnswer(null, index, productFinderReducerData, QuestionIndex, null, QuestionItem, SelectedCheckBox, item);
        }}
      >


        {/* {item && item.Answer_Options.map((answerOptionsItem, answerIndex) => ( */}
        {/* {
                    item.value === "Yes" || item.value === "No" ?
                        <TouchableDebounce
                            onPress={() => {
                                this.finaliseAnswer(null, index, productFinderReducerData, QuestionIndex, null, QuestionItem, SelectedCheckBox, item)
                            }}
                            disabled={item.Active ? false : true}
                            style={[styles.selectedYesNoCheckbox, { backgroundColor: SelectedCheckBox === "Yes" || SelectedCheckBox === "No" ? '#FFEC4D' : null }]}
                        >

                            <Text style={{ fontSize: 12, color: !item.Active && colors.blur }}>{item.value}</Text>

                        </TouchableDebounce>
                        : */}
        <CheckBoxItem
          disabled={!item.Active}
          key={index}
          filterData={item}
          isSelected={SelectedCheckBox.includes(item.value)}
          selectCheckboxFilter={() => this.finaliseAnswer(null, index, productFinderReducerData, QuestionIndex, null, QuestionItem, SelectedCheckBox, item)}
          order="reverse"
          Component="ProductFinder"
          TranslationIdCheckingApi={TranslationIdCheckingApi}
          translations={this.props.translations}
        />
        {/* } */}
        {/* ))} */}
        {/* </ScrollView> */}
      </TouchableDebounce>
    );
  }

  renderSelectedGroup = (item, index, productFinderReducer, SelectedYesNoCheckBox) => (
    // this.finaliseAnswer(null, SelectedYesNoCheckBox && SelectedYesNoCheckBox == "No" ? 1 : SelectedYesNoCheckBox && SelectedYesNoCheckBox == "Yes" ? 0 : 0, productFinderReducer, index, null, item, null, SelectedYesNoCheckBox && SelectedYesNoCheckBox == "No" ? item.Answer_Options[1] : SelectedYesNoCheckBox && SelectedYesNoCheckBox == "Yes" ? item.Answer_Options[0] : item.Answer_Options[0])
    this.props.selectedMultipleAnswers(null, SelectedYesNoCheckBox && SelectedYesNoCheckBox === 'No' ? 0 : SelectedYesNoCheckBox && SelectedYesNoCheckBox === 'Yes' ? 1 : 0, productFinderReducer, index, null, SelectedYesNoCheckBox && SelectedYesNoCheckBox === 'No' ? [item.Answer_Options[0]] : SelectedYesNoCheckBox && SelectedYesNoCheckBox === 'Yes' ? [item.Answer_Options[1]] : [item.Answer_Options[0]])

  )

  selectedSlider = (low, high, productFinderReducer, index, status) => {
    sliderValueInput = low;
  }

  sliderDragsComplete(productFinderReducer, index, status) {
    this.props.selectedMultipleAnswers(null, null, productFinderReducer, index, status, [{ value: sliderValueInput && sliderValueInput.toString() }]);
  }


  render() {
    const {
      item, index, productFinderReducer, QuestionItem, translations, TranslationIdExplaination
    } = this.props;
    const TranslationIdCheckingApi = item.Translation_ID;
    const TranslationUnitCheckingApi = item.Unit.Translation_ID && item.Unit.Translation_ID;
    let SelectedAnswerYesNoFlag;
    let SelectedYesNoCheckBox;
    let SelectedYesNoActiveStatus;
    let DisabledSelectedYesCheckboxFlag;
    productFinderReducer.arr && productFinderReducer.arr.questions[index].Answer_Options && productFinderReducer.arr.questions[index].Answer_Options.forEach((selectedItem, selectedIndex) => {
      if (selectedItem.value === 'Yes' || selectedItem.value === 'No') {
        SelectedAnswerYesNoFlag = productFinderReducer.arr.questions[index];
        if (selectedItem.value === 'Yes' && selectedItem.Active) {
          DisabledSelectedYesCheckboxFlag = true;
        }
        if (!selectedItem.Active) {
          SelectedYesNoActiveStatus = true;
        }
      }
    });
    productFinderReducer.arr.questions[index].Answer && productFinderReducer.arr.questions[index].Answer.forEach((groupItem) => {
      SelectedYesNoCheckBox = groupItem.value;
    });
    sliderValueInput = item.Minimum && item.Maximum
      ? productFinderReducer.arr.questions[index].Answer ? parseInt(productFinderReducer.arr.questions[index].Answer[0].value)
        : item.Minimum : item.Minimum;
    // console.log('Product finder reducer====>', productFinderReducer);
    const ExplainationUpdatedText = tr(translations, TranslationIdExplaination, item.Explanation.Name, 'upper');
    return (
      <View style={{ paddingVertical: '3%' }}>

        {
          item.Type === 'distinct' || item.Type === 'interval'
            ? (
              <View>
                <TouchableDebounce
                  style={styles.checkboxGroupWrapper}
                  onPress={() => { !(SelectedAnswerYesNoFlag && SelectedAnswerYesNoFlag.QuestionName === item.QuestionName) && this.openCheckBoxGroup(); }}
                >
                  <View
                    style={styles.checkboxGroupWrapperInner}
                    // removeClippedSubviews={false}
                    ref={(ref) => { this.checkboxGroupRef = ref; }}
                  >

                    <View style={styles.filterOption}>
                      <Text style={{ fontSize: 14, color: SelectedYesNoActiveStatus ? colors.blur : colors.black }}>
                        {tr(translations, TranslationIdCheckingApi, item.QuestionName, 'upper')}
                        {
                          item.Unit.Translation_ID && item.Unit.Name
                          && (
                            <Text style={{ fontSize: 14, color: SelectedYesNoActiveStatus ? colors.blur : colors.black }}>
                              {' '}
                              (
                              {tr(translations, TranslationUnitCheckingApi, item.Unit.Name, 'upper')}
                              )
                            </Text>
                          )
                        }
                      </Text>
                    </View>

                    <View style={styles.filterOptionCheckBox}>
                      {
                        SelectedAnswerYesNoFlag && SelectedAnswerYesNoFlag.QuestionName === item.QuestionName

                          ? (
                            <TouchableDebounce
                              disabled={SelectedYesNoActiveStatus}
                              onPress={() => {
                                this.renderSelectedGroup(item, index, productFinderReducer, SelectedYesNoCheckBox);
                                //  this.finaliseAnswer(null, Answerindex, productFinderReducer, item, null, index, null, Answeritem)
                              }}
                              style={[styles.checkBox, { borderColor: SelectedYesNoActiveStatus ? colors.blur : colors.black }]}
                            >
                              {SelectedYesNoCheckBox && SelectedYesNoCheckBox === 'Yes' || SelectedYesNoActiveStatus && DisabledSelectedYesCheckboxFlag
                                ? (
                                  <FontIcon
                                    type={icons.done[1]}
                                    icon={icons.done[0]}
                                    color={SelectedYesNoActiveStatus && DisabledSelectedYesCheckboxFlag ? colors.blur : colors.text}
                                    size={10}
                                  />
                                )
                                : null}
                            </TouchableDebounce>
                          )

                          : (
                            <FontIcon
                              type={this.state.toggleCheckbox ? icons.upArrowIon[1] : icons.downArrowIon[1]}
                              icon={this.state.toggleCheckbox ? icons.upArrowIon[0] : icons.downArrowIon[0]}
                              size={16}
                              color={colors.text}
                            />
                          )

                      }
                    </View>

                  </View>
                </TouchableDebounce>
                {
                  this.state.toggleCheckbox
                  && (
                    <View>

                      {
                        item && item.Answer_Options.map((answerOptionsItem, answerIndex) => (
                          this.renderGroup(answerOptionsItem, answerIndex, productFinderReducer, item, index)
                        ))

                      }
                    </View>
                  )

                }
              </View>
            )
            : (
              <View style={{  width: '92%' }}>

                <View style={styles.checkboxGroupWrapperInner}>
                  <Text style={{ fontSize: 14, color: SelectedYesNoActiveStatus ? colors.blur : colors.black }}>
                    {tr(translations, TranslationIdCheckingApi, item.QuestionName, 'upper')}
                    {
                      item.Unit.Translation_ID && item.Unit.Name
                      && (
                        <Text style={{ fontSize: 14, color: SelectedYesNoActiveStatus ? colors.blur : colors.black }}>
                          {' '}
                          (
                          {tr(translations, TranslationUnitCheckingApi, item.Unit.Name, 'upper')}
                          )
                        </Text>
                      )
                    }
                  </Text>
                </View>
                <View style={{ paddingBottom: 10, width: '90%',paddingLeft:'4%' }}>
                  <RangeSlider
                    ref={(ref) => { ref; }}
                    style={{ height: 60, }}
                    //  gravity="bottom"
                    min={item.Minimum}
                    rangeEnabled={false}
                    max={item.Maximum}
                    initialLowValue={sliderValueInput}
                    step={1}
                    selectionColor={colors.primaryColor}
                    blankColor={colors.darkBg}
                    thumbBorderColor={colors.borderDark}
                    thumbColor={colors.primaryColor}
                    lineWidth={7}
                    handleDiameter={10}
                    onValueChanged={(low, high) => this.selectedSlider(low, high, productFinderReducer, index, 'slider')}
                    onTouchEnd={() => { this.sliderDragsComplete(productFinderReducer, index, 'slider'); }}
                    floatingLabel
                  />
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: '3%'
                  ,paddingLeft:'4%'
                  ,paddingRight:'5%'
                }}
                >
                  <Text style={{ lineHeight: 20, color: colors.black, ...appStyles.headFontSize, }}>{item.Minimum}</Text>
                  <Text style={{ lineHeight: 20, color: colors.black, ...appStyles.headFontSize, }}>{item.Maximum}</Text>
                </View>
              </View>
            )

        }

        {
          item.Explanation.Name
          && (
            <View style={{ position: 'absolute', right: '0%', top: '20%' }}>
              <Tooltip
                backgroundColor="#FFEC4D"
                height={85}
                onOpen={() => { this.setState({ isExplainationIcon: true }); }}
                onClose={() => { this.setState({ isExplainationIcon: false }); }}
                width={300}
                popover={(
                  <View style={{}}>
                    <Text style={{ fontSize: 12, ...fonts.medium }}>
                      {ExplainationUpdatedText && ExplainationUpdatedText.split(';').join('\n')}
                    </Text>
                  </View>
                )}
                overlayColor="tansparent"
                containerStyle={{ borderRadius: 0 }}
              >
                <View style={{}}>
                  {
                    this.state.isExplainationIcon
                      ? (
                        <Image
                          source={images.info_yellow}
                          style={{ height: 40, width: 35 }}
                          resizeMode="contain"
                        />
                      )
                      : (
                        <Image
                          source={images.Info_black}
                          style={{ height: 35, width: 35 }}
                          resizeMode="contain"
                        />
                      )
                  }
                </View>
              </Tooltip>
            </View>
          )
        }

      </View>
    );
  }
}

export default CheckboxFilter;
