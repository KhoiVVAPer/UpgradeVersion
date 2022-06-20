package com.ak_dca_app;

import android.widget.Toast;
import android.widget.TextView;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import android.graphics.Color;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.views.image.ReactImageView;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.drawee.backends.pipeline.Fresco;
import androidx.annotation.Nullable;
import com.facebook.react.uimanager.SimpleViewManager;

import java.util.Map;
import java.util.HashMap;
import com.facebook.react.common.MapBuilder;

public class MarkText extends SimpleViewManager<MarkTextView> {
  @Override
  public String getName() {
    return "MarkText";
  }

  @Override
  protected MarkTextView createViewInstance(ThemedReactContext reactContext) {
    return new MarkTextView(reactContext);
  }

  @ReactProp(name="markingText")
  public void setMarkingTextProp(MarkTextView markTextView, String markingText) {
    markTextView.setMarkingText(markingText);
  }

  @ReactProp(name="markingColor")
  public void setMarkingColorProp(MarkTextView markTextView, String markingColor) {
    markTextView.setMarkingColor(Color.parseColor(markingColor));
  }

  @Override
  public Map getExportedCustomBubblingEventTypeConstants() {
      return MapBuilder.builder()
              .put(
                      "statusChange",
                      MapBuilder.of(
                              "phasedRegistrationNames",
                              MapBuilder.of("bubbled", "onStatusChange")))
              .build();
  }
}