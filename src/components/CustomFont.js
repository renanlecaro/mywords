import { getSetting, onSettingsChange } from "../services/settings";
import { Component } from "react";

export class CustomFontImporter extends Component {
  componentDidMount() {
    onSettingsChange("useCursiveFont", (e) => this.forceUpdate());
  }

  render() {
    if (!getSetting().useCursiveFont) return null;
    const css = `
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  .ru-text{
    font-family:Pacifico !important;
    font-weight:normal !important;
  }
  `;
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </div>
    );
  }
}
