package com.ak_dca_app;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;


public class MarkTextView extends TextView {
    public String markingText = "Mark";
    public int markingColor = Color.parseColor("#E74C3C");

    public MarkTextView(Context context) {
        super(context);
        this.setTextColor(Color.BLACK);
        this.setTextIsSelectable(true);
        // this.setColorAccent(true);
        this.setHighlightColor(this.markingColor);
        this.setText(this.markingText);
    }

    public MarkTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public MarkTextView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public void setMarkingText (String initialMarkingText){
        markingText = initialMarkingText;
        this.setText(initialMarkingText);
    }

    public void setMarkingColor (int initialMarkingColor){
        markingColor = initialMarkingColor;
        this.setHighlightColor(initialMarkingColor);
    }

    protected void onSelectionChanged (int selStart, int selEnd) {
        WritableMap event = Arguments.createMap();
        event.putInt("startOffset", selStart);
        event.putInt("endOffset", selEnd);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "statusChange", event);
    }
}