/*
 * App Global CSS
 * ----------------------------------------------------------------------------
 * Put style rules here that you want to apply globally. These styles are for
 * the entire app and not just one component. Additionally, this file can be
 * used as an entry point to import other CSS/Sass files to be included in the
 * output CSS.
 * For more information on global stylesheets, visit the documentation:
 * https://ionicframework.com/docs/layout/global-stylesheets
 */

/* Core CSS required for Ionic components to work properly */
@import "@ionic/angular/css/core.css";

/* Basic CSS for apps built with Ionic */
@import "@ionic/angular/css/normalize.css";
@import "@ionic/angular/css/structure.css";
@import "@ionic/angular/css/typography.css";
@import "@ionic/angular/css/display.css";

/* Optional CSS utils that can be commented out */
@import "@ionic/angular/css/padding.css";
@import "@ionic/angular/css/float-elements.css";
@import "@ionic/angular/css/text-alignment.css";
@import "@ionic/angular/css/text-transformation.css";
@import "@ionic/angular/css/flex-utils.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import "@ionic/angular/css/palettes/dark.always.css"; */
/* @import "@ionic/angular/css/palettes/dark.class.css"; */
@import "@ionic/angular/css/palettes/dark.system.css";

:root {
  --primary-color-01: #c12a2a;
  --primary-color-02: #e54747;
  --primary-color-03: #f85555;
  --primary-color-04: #ff7575;
  --primary-color-05: #ff827d;
  --primary-color-06: #ff9490;
  --primary-color-07: #ffb4b1;
  --primary-color-08: #ffcdcb;

  --neutral-color-01: #000000;
  --neutral-color-02: #121212;
  --neutral-color-03: #2e2e2e;
  --neutral-color-04: #404040;
  --neutral-color-05: #595959;
  --neutral-color-06: #717171;
  --neutral-color-07: #9c9c9c;
  --neutral-color-08: #b3b3b3;
  --neutral-color-09: #cccccc;
  --neutral-color-10: #dedede;
  --neutral-color-11: #ededed;
  --neutral-color-12: #f7f7f7;
  --neutral-color-13: #ffffff;
}
@import url("https://fonts.googleapis.com/css2?family=Koulen&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap");
.primary-color-01-bg {
  background-color: var(--primary-color-01);
}
.primary-color-02-bg {
  background-color: var(--primary-color-02);
}
.primary-color-03-bg {
  background-color: var(--primary-color-03);
}
.primary-color-04-bg {
  background-color: var(--primary-color-04);
}
.primary-color-05-bg {
  background-color: var(--primary-color-05);
}
.primary-color-06-bg {
  background-color: var(--primary-color-06);
}
.primary-color-07-bg {
  background-color: var(--primary-color-07);
}
.primary-color-08-bg {
  background-color: var(--primary-color-08);
}

.neutral-color-bg-01 {
  background-color: var(--neutral-color-01);
}
.neutral-color-bg-02 {
  background-color: var(--neutral-color-02);
}
.neutral-color-bg-03 {
  background-color: var(--neutral-color-03);
}
.neutral-color-bg-04 {
  background-color: var(--neutral-color-04);
}
.neutral-color-bg-05 {
  background-color: var(--neutral-color-05);
}
.neutral-color-bg-06 {
  background-color: var(--neutral-color-06);
}
.neutral-color-bg-07 {
  background-color: var(--neutral-color-07);
}
.neutral-color-bg-08 {
  background-color: var(--neutral-color-08);
}
.neutral-color-bg-09 {
  background-color: var(--neutral-color-09);
}
.neutral-color-bg-10 {
  background-color: var(--neutral-color-10);
}
.neutral-color-bg-11 {
  background-color: var(--neutral-color-11);
}
.neutral-color-bg-12 {
  background-color: var(--neutral-color-12);
}
.neutral-color-bg-13 {
  background-color: var(--neutral-color-13);
}

.primary-color-01 {
  color: var(--primary-color-01);
}
.primary-color-02 {
  color: var(--primary-color-02);
}
.primary-color-03 {
  color: var(--primary-color-03);
}
.primary-color-04 {
  color: var(--primary-color-04);
}
.primary-color-05 {
  color: var(--primary-color-05);
}
.primary-color-06 {
  color: var(--primary-color-06);
}
.primary-color-07 {
  color: var(--primary-color-07);
}
.primary-color-08 {
  color: var(--primary-color-08);
}

.neutral-color-01 {
  color: var(--neutral-color-01);
}
.neutral-color-02 {
  color: var(--neutral-color-02);
}
.neutral-color-03 {
  color: var(--neutral-color-03);
}
.neutral-color-04 {
  color: var(--neutral-color-04);
}
.neutral-color-05 {
  color: var(--neutral-color-05);
}
.neutral-color-06 {
  color: var(--neutral-color-06);
}
.neutral-color-07 {
  color: var(--neutral-color-07);
}
.neutral-color-08 {
  color: var(--neutral-color-08);
}
.neutral-color-09 {
  color: var(--neutral-color-09);
}
.neutral-color-10 {
  color: var(--neutral-color-10);
}
.neutral-color-11 {
  color: var(--neutral-color-11);
}
.neutral-color-12 {
  color: var(--neutral-color-12);
}
.neutral-color-13 {
  color: var(--neutral-color-13);
}
.font-koulen {
  font-family: "Koulen", sans-serif;
}
.font-lexend {
  font-family: "Lexend", sans-serif;
  font-weight: bold;
}

.header-bg {
  --ion-toolbar-background: transparent;
  padding-top: 1.5rem;
}
.button {
  font-family: "Lexend", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  --background: var(--primary-color-02);
  --border-radius: 2rem;
  --color: white;
  --padding-start: 2rem;
  --padding-end: 2rem;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}
.center-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pb-1 {
  padding-bottom: 1.5rem;
}
.width-20ch {
  width: 20ch;
}
body {
  --ion-background-color: #242323; // Substitua por qualquer cor que quiser
}
























/*
 * App Global CSS
 * ----------------------------------------------------------------------------
 * Put style rules here that you want to apply globally. These styles are for
 * the entire app and not just one component. Additionally, this file can be
 * used as an entry point to import other CSS/Sass files to be included in the
 * output CSS.
 * For more information on global stylesheets, visit the documentation:
 * https://ionicframework.com/docs/layout/global-stylesheets
 */

/* Core CSS required for Ionic components to work properly */
@import "@ionic/angular/css/core.css";

/* Basic CSS for apps built with Ionic */
@import "@ionic/angular/css/normalize.css";
@import "@ionic/angular/css/structure.css";
@import "@ionic/angular/css/typography.css";
@import "@ionic/angular/css/display.css";

/* Optional CSS utils that can be commented out */
@import "@ionic/angular/css/padding.css";
@import "@ionic/angular/css/float-elements.css";
@import "@ionic/angular/css/text-alignment.css";
@import "@ionic/angular/css/text-transformation.css";
@import "@ionic/angular/css/flex-utils.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import "@ionic/angular/css/palettes/dark.always.css"; */
/* @import "@ionic/angular/css/palettes/dark.class.css"; */
@import "@ionic/angular/css/palettes/dark.system.css";

:root {
  --primary-color-01: #c12a2a;
  --primary-color-02: #e54747;
  --primary-color-03: #f85555;
  --primary-color-04: #ff7575;
  --primary-color-05: #ff827d;
  --primary-color-06: #ff9490;
  --primary-color-07: #ffb4b1;
  --primary-color-08: #ffcdcb;

  --neutral-color-01: #000000;
  --neutral-color-02: #121212;
  --neutral-color-03: #2e2e2e;
  --neutral-color-04: #404040;
  --neutral-color-05: #595959;
  --neutral-color-06: #717171;
  --neutral-color-07: #9c9c9c;
  --neutral-color-08: #b3b3b3;
  --neutral-color-09: #cccccc;
  --neutral-color-10: #dedede;
  --neutral-color-11: #ededed;
  --neutral-color-12: #f7f7f7;
  --neutral-color-13: #ffffff;
}
@import url("https://fonts.googleapis.com/css2?family=Koulen&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap");
.primary-color-01-bg {
  background-color: var(--primary-color-01);
}
.primary-color-02-bg {
  background-color: var(--primary-color-02);
}
.primary-color-03-bg {
  background-color: var(--primary-color-03);
}
.primary-color-04-bg {
  background-color: var(--primary-color-04);
}
.primary-color-05-bg {
  background-color: var(--primary-color-05);
}
.primary-color-06-bg {
  background-color: var(--primary-color-06);
}
.primary-color-07-bg {
  background-color: var(--primary-color-07);
}
.primary-color-08-bg {
  background-color: var(--primary-color-08);
}

.neutral-color-bg-01 {
  background-color: var(--neutral-color-01);
}
.neutral-color-bg-02 {
  background-color: var(--neutral-color-02);
}
.neutral-color-bg-03 {
  background-color: var(--neutral-color-03);
}
.neutral-color-bg-04 {
  background-color: var(--neutral-color-04);
}
.neutral-color-bg-05 {
  background-color: var(--neutral-color-05);
}
.neutral-color-bg-06 {
  background-color: var(--neutral-color-06);
}
.neutral-color-bg-07 {
  background-color: var(--neutral-color-07);
}
.neutral-color-bg-08 {
  background-color: var(--neutral-color-08);
}
.neutral-color-bg-09 {
  background-color: var(--neutral-color-09);
}
.neutral-color-bg-10 {
  background-color: var(--neutral-color-10);
}
.neutral-color-bg-11 {
  background-color: var(--neutral-color-11);
}
.neutral-color-bg-12 {
  background-color: var(--neutral-color-12);
}
.neutral-color-bg-13 {
  background-color: var(--neutral-color-13);
}

.primary-color-01 {
  color: var(--primary-color-01);
}
.primary-color-02 {
  color: var(--primary-color-02);
}
.primary-color-03 {
  color: var(--primary-color-03);
}
.primary-color-04 {
  color: var(--primary-color-04);
}
.primary-color-05 {
  color: var(--primary-color-05);
}
.primary-color-06 {
  color: var(--primary-color-06);
}
.primary-color-07 {
  color: var(--primary-color-07);
}
.primary-color-08 {
  color: var(--primary-color-08);
}

.neutral-color-01 {
  color: var(--neutral-color-01);
}
.neutral-color-02 {
  color: var(--neutral-color-02);
}
.neutral-color-03 {
  color: var(--neutral-color-03);
}
.neutral-color-04 {
  color: var(--neutral-color-04);
}
.neutral-color-05 {
  color: var(--neutral-color-05);
}
.neutral-color-06 {
  color: var(--neutral-color-06);
}
.neutral-color-07 {
  color: var(--neutral-color-07);
}
.neutral-color-08 {
  color: var(--neutral-color-08);
}
.neutral-color-09 {
  color: var(--neutral-color-09);
}
.neutral-color-10 {
  color: var(--neutral-color-10);
}
.neutral-color-11 {
  color: var(--neutral-color-11);
}
.neutral-color-12 {
  color: var(--neutral-color-12);
}
.neutral-color-13 {
  color: var(--neutral-color-13);
}
.font-koulen {
  font-family: "Koulen", sans-serif;
}
.font-lexend {
  font-family: "Lexend", sans-serif;
  font-weight: bold;
}

.header-bg {
  --ion-toolbar-background: transparent;
}
.button {
  font-family: "Lexend", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  --background: var(--primary-color-02);
  --border-radius: 2rem;
  --color: white;
  --padding-start: 2rem;
  --padding-end: 2rem;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}
.center-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pb-1 {
  padding-bottom: 1.5rem;
}
.width-20ch {
  width: 20ch;
}
