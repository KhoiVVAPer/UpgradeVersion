import React, { Component } from 'react';
import {
  View,
  Modal,
  TextInput,
  Platform,
  Alert,
  Text,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { saveMarkingText as persistMarkingText, deleteMarkingText as removeMarkingText } from '../../../../redux/actions';
import {
  icons,
  colors,
  appStyles,
  texts,
  tr,
  appConstants,
  helpers
} from '../../../../config';
import { FontIcon, Button } from '../../generic';
import { TouchableDebounce } from '../../elements';
import { MarkTextAndroid } from '../../../../nativeModules';
import styles from './styles';

const { textCasing, firebaseEvents } = appConstants;

class MarkingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      value: '',
      activeColor: colors.red,
      comment: '',
      textKey: '',
      activeTextObj: {},
      activeText: '',
      isDelete: false
    };
    this.markingInput = null;
    this.selectedText = '';
    this.selectedTextStart = 0;
    this.selectedTextEnd = 0;
    this.successMessage = '';
    this.commentInput = null;
  }

  componentDidMount() {
    const { setMarkingModal } = this.props;
    setMarkingModal(this);
  }

  setData = (value, textKey, activeTextObj, isDelete) => {
    const { translations } = this.props;
    if (isDelete && !activeTextObj.comment) {
      this.successMessage = tr(translations, 'marking_deleted', 'Marking deleted');
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'delete_marking_warning', 'Do you want to delete marking?'),
        [{
          text: tr(translations, 'cancel', 'Cancel', textCasing.U),
        }, {
          text: tr(translations, 'ok', 'OK', textCasing.U),
          onPress: () => {
            this.setState({
              activeTextObj
            }, () => {
              this.deleteComment();
            });
          }
        }]
      );
      return;
    }
    if (isDelete) this.successMessage = tr(translations, 'comments_is_deleted', 'Comments is deleted');

    this.setState({
      isVisible: true,
      value,
      textKey,
      activeTextObj,
      activeText: activeTextObj.text,
      isCommentShow: false,
      isDelete,
      activeColor: colors.red
    });
  }

  hideModal = () => {
    this.setState({
      isVisible: false,
      isCommentShow: false,
      value: '',
      activeTextObj: {},
      activeText: '',
      activeColor: colors.purple,
      comment: '',
      textKey: '',
      isDelete: false
    });
  }

  selectText = ({ nativeEvent }) => {
    // Keyboard.dismiss();
    this.markingInput.focus();
    const { value, activeTextObj } = this.state;
    const { start, end } = nativeEvent.selection;
    const originalDiff = activeTextObj.startOffset;
    const originalStart = start + originalDiff;
    const originalEnd = end + originalDiff;
    const diff = originalEnd - originalStart;
    this.selectedText = value.substr(originalStart, diff);
    this.selectedTextStart = originalStart;
    this.selectedTextEnd = originalEnd;
  }

  selectTextAndroid = (e) => {
    const start = e.nativeEvent.startOffset;
    const end = e.nativeEvent.endOffset;

    const { value, activeTextObj } = this.state;
    const originalDiff = activeTextObj.startOffset;
    const originalStart = start + originalDiff;
    const originalEnd = end + originalDiff;
    const diff = originalEnd - originalStart;
    this.selectedText = value.substr(originalStart, diff);
    this.selectedTextStart = originalStart;
    this.selectedTextEnd = originalEnd;
  }

  renderCloseIcon = () => (
    <FontIcon
      type={icons.closeIon[1]}
      icon={icons.closeIon[0]}
      color={colors.black}
      size={20}
      wrapStyle={styles.closeWrap}
      onPress={() => { this.hideModal(); }}
    />
  );

  renderMarkingInput = () => {
    const { translations } = this.props;
    const {
      isCommentShow, activeColor, activeText, isDelete
    } = this.state;
    if (isCommentShow || isDelete) return null;

    return (
      <View>
        <Text style={styles.heading}>{tr(translations, 'create_text_marking', 'CREATE TEXT MARKING', textCasing.U)}</Text>
        {
          Platform.OS === 'ios' ? (
            <TextInput
              ref={(ref) => { this.markingInput = ref; }}
              multiline
              value={activeText}
              editable={Platform.OS !== 'ios'}
              selectionColor={activeColor}
              onSelectionChange={(e) => { this.selectText(e); }}
              onChangeText={() => { this.setState({ activeText }); }}
              // onFocus={Keyboard.dismiss()}
              // onBlur={Keyboard.dismiss()}
              // onKeyPress={Keyboard.dismiss()}
              keyboardType={null}
              style={styles.input}
            />
          ) : (
            <ScrollView
              style={{
                padding: 20,
                backgroundColor: colors.bg,
                color: colors.text,
                height: 250
              }}
              contentContainerStyle={{ flex: 1 }}
            >
              <MarkTextAndroid
                style={{ flex: 1 }}
                markingText={activeText}
                onStatusChange={this.selectTextAndroid}
                markingColor={activeColor}
              />
            </ScrollView>
          )
        }

      </View>
    );
  }

  renderColorBox = (color) => {
    const { activeColor } = this.state;
    const activeStyle = activeColor === color ? styles.activeColorBox : {};
    return (
      <TouchableDebounce
        style={[styles.colorBoxWrap, activeStyle]}
        onPress={() => { this.setState({ activeColor: color }); }}
      >
        <View style={[styles.colorBox, { backgroundColor: color }]} />
      </TouchableDebounce>
    );
  }

  renderFooter = () => {
    const { translations } = this.props;
    const { isCommentShow, isDelete } = this.state;
    if (isCommentShow || isDelete) return null;
    return (
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          {this.renderColorBox(colors.red)}
          {this.renderColorBox(colors.yellow)}
          {this.renderColorBox(colors.green)}
        </View>
        <View style={styles.footerRight}>
          <Button
            onPress={() => { this.saveComment(); }}
            text={tr(translations, 'add_marking', 'ADD MARKING', textCasing.U)}
            theme="app"
            style={{ marginRight: 10 }}
          />
          <Button
            onPress={() => { this.setState({ isCommentShow: true }); }}
            text={tr(translations, 'add_comment', 'ADD COMMENT', textCasing.U)}
            theme="app"
          />
        </View>
      </View>
    );
  }

  renderCommentWrap = () => {
    const { translations } = this.props;
    const { isCommentShow, comment, isDelete } = this.state;
    if (!isCommentShow || isDelete) return null;
    return (
      <View style={styles.commentWrap}>
        <View style={styles.commentHeadWrap}>
          <View style={styles.commentHeadLeft}>
            <FontIcon
              type={icons.chat_filled[1]}
              icon={icons.chat_filled[0]}
              color={colors.black}
              size={24}
              wrapStyle={styles.commentIco}
            />
            <Text style={styles.heading}>{tr(translations, 'add_text_comment', 'ADD TEXT COMMENT', textCasing.U)}</Text>
          </View>
          <Text style={styles.commentDate}>{moment(new Date()).format('D/MM/YYYY')}</Text>
        </View>
        <TouchableDebounce
          style={styles.commentContent}
          onPress={() => { this.commentInput.focus(); }}
        >
          <TextInput
            ref={(ref) => { this.commentInput = ref; }}
            multiline
            value={comment}
            onChangeText={(t) => { this.setState({ comment: t }); }}
            style={styles.commentInput}
          />
        </TouchableDebounce>
        <View style={styles.commentFooter}>
          <Button
            onPress={() => { this.setState({ comment: '', isCommentShow: false }); }}
            text={tr(translations, 'back', 'BACK', textCasing.U)}
            theme="gray"
            style={{ ...appStyles.mgH10 }}
          />
          <Button
            onPress={() => {
              if (!comment) {
                Alert.alert(
                  tr(translations, 'warning', texts.alerts.warning),
                  tr(translations, 'please_add_the_comment_first', 'Please add the comment first')
                );
                return;
              }
              this.saveComment();
            }}
            text={tr(translations, 'add_comment', 'ADD COMMENT', textCasing.U)}
            theme="app"
          />
        </View>
      </View>
    );
  }

  saveComment = () => {
    const { saveMarkingText, translations, universal } = this.props;
    const {
      comment,
      activeColor,
      textKey,
      activeText
    } = this.state;

    if ((this.selectedTextEnd - this.selectedTextStart) < 1) {
      Alert.alert(
        tr(translations, 'error', texts.alerts.error),
        tr(translations, 'no_text_is_marked', 'No text is marked')
      );
      return;
    }

    const data = {
      key: textKey,
      text: this.selectedText,
      startOffset: this.selectedTextStart,
      endOffset: this.selectedTextEnd,
      comment,
      highlightColor: activeColor,
      commentDate: new Date().getTime()
    };
    saveMarkingText(data).then(() => {
      helpers.analyticsEvent(
        comment
          ? firebaseEvents.COMMENT_ADDED
          : firebaseEvents.TEXT_MARKED,
        {
          textBlock: activeText
        },
        universal
      );
      Alert.alert(
        tr(translations, 'success', texts.alerts.success),
        comment
          ? tr(translations, 'comments_is_saved', 'Comments is saved')
          : tr(translations, 'marking_is_saved', 'Marking is saved'),
        [{
          text: tr(translations, 'ok', 'OK', textCasing.U),
          onPress: () => {
            setTimeout(() => {
              this.hideModal();
            }, 250);
          }
        }]
      );
    });
  }

  deleteComment = () => {
    const { deleteMarkingText, translations } = this.props;
    const { activeTextObj } = this.state;
    deleteMarkingText(activeTextObj.id).then(() => {
      Alert.alert(
        tr(translations, 'success', texts.alerts.success),
        this.successMessage,
        [{
          text: tr(translations, 'ok', 'OK', textCasing.U),
          onPress: () => {
            setTimeout(() => {
              this.hideModal();
            }, 250);
          }
        }]
      );
    });
  }

  renderCommentDeleteWrap = () => {
    const { activeTextObj, isDelete } = this.state;
    const { translations } = this.props;
    if (!isDelete) return null;
    return (
      <View style={styles.deleteWrap}>
        <View style={styles.commentHeadWrap}>
          <View style={styles.commentHeadLeft}>
            <FontIcon
              type={icons.chat_filled[1]}
              icon={icons.chat_filled[0]}
              color={colors.black}
              size={24}
              wrapStyle={styles.commentIco}
            />
            <Text style={styles.heading}>{tr(translations, 'comment', 'COMMENT', textCasing.U)}</Text>
          </View>
          <Text style={styles.commentDate}>{moment(new Date(activeTextObj.commentDate)).format('D/MM/YYYY')}</Text>
        </View>
        <View style={styles.deleteContent}>
          <Text style={styles.commentTxt}>{activeTextObj.comment}</Text>
        </View>
        <View style={styles.deleteFooter}>
          <Button
            onPress={() => { this.deleteComment(); }}
            text={tr(translations, 'delete_comment', 'DELETE COMMENT', textCasing.U)}
            theme="app"
          />
        </View>
      </View>
    );
  }

  render() {
    const { isVisible } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={() => { }}
      >
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.wrap}
            behavior="padding"
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            // behavior={(Platform.OS === 'ios') ? 'padding' : null}
            // keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            enabled
          >
            <View style={styles.wrapInner}>
              {this.renderCloseIcon()}
              {/* <ScrollView style={{}} contentContainerStyle={{}}> */}
              {this.renderMarkingInput()}
              {this.renderFooter()}
              {this.renderCommentWrap()}
              {this.renderCommentDeleteWrap()}
              {/* </ScrollView> */}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  universal: state.universal,
  textMarking: state.textMarking,
  translations: state.translations.arr
});
const mapDispatchToProps = (dispatch) => ({
  saveMarkingText: (markingData) => persistMarkingText(dispatch, markingData),
  deleteMarkingText: (id) => removeMarkingText(dispatch, id),
});
const MarkingModalRedux = connect(mapStateToProps, mapDispatchToProps)(MarkingModal);
export default MarkingModalRedux;
