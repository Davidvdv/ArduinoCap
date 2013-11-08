enum HorizontalViewAngle {
  fullLeft,
  left,
  straight,
  right,
  fullRight
};
enum VerticalViewAngle {
  screen,
  watching
};
HorizontalViewAngle userHorizontalAngle;
VerticalViewAngle userVerticalAngle;
static String horizontalViewAngleToString(enum HorizontalViewAngle userHorizontalAngle);
static String verticalViewAngleToString(enum VerticalViewAngle userVerticalAngle);
