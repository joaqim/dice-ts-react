// @ts-nocheck
export default {
  dice_container: {
    position: "absolute",
    width: "100px",
    height: "100px",
    // height: "720px",
    // top: "280px",
    // left: "480px",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1600px", // 1500px
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    KhtmlUserSelect: "none",
    MozUserSelect: "none",
    //MsUserSelect: "none",
    userSelect: "none",
  },
  dice: {
    position: "absolute",
    zIndex: "1",
    marginLeft: "auto",
    marginTop: "auto",
    transformStyle: "preserve-3d",
    transformOrigin: "center",
    width: "60px",
    height: "60px",
  },
  dice___div: {
    height: "55px",
    width: "55px",
    //backfaceVisibility: "hidden",
    position: "absolute",
    background: "#776522",
    borderColor: "#111",
    border: "1px solid",
    WebkitBackgroundClip: "padding-box",
    backgroundClip: "padding-box",
    boxShadow: "0px 0px 0px 2px rgba(85, 51, 17, 0.8)",
    borderRadius: "8px",
    //backgroundImage: "url(./assets/dice_texture-marble1.jpg)",
    backgroundSize: "100px",
  },
  dice_corner_sq: {
    width: "12px",
    height: "14px",
    display: "block",
    position: "absolute",
    left: "26px",
    top: "22px",
    backfaceVisibility: "hidden",
    zIndex: "1",
    background: "#553311",
    //borderLeft: "6px solid red",
    //borderRight: "6px solid red",
    //borderRight: "6px solid transparent",
    //borderBottom: "12px solid black",
    //transform: "rotateY(60deg)"
  },
  /* Equilateral Triangle:
   height is 86.6% of the width so:
    border-bottom-width = (border-left-width + border-right-width) * 0.866% 
   */
  dice_corner: {
    width: "0",
    height: "0",
    display: "block",
    position: "absolute",
    //left: "26px",
    //top: "-4px",
    //backfaceVisibility: "hidden",
    zIndex: "1",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderBottom: "11.2px solid #563812",// #553311 // (12) => 12 * 0.86 = 11.2, (14)=>12.15

    //borderRight: "6px solid transparent",
    //borderBottom: "12px solid black",
    //transform: "rotateY(60deg)"
  },
  dice_span: {
    width: "8px",
    height: "8px",
    background: "#222",
    borderRadius: "50%",
    borderColor: "#000",
    display: "block",
    position: "absolute",
    WebkitFilter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75))",
    MozFilter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75))",
    MsFilter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75))",
    OFilter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75))",
    filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75))",
  },
  dice_inner_plane: {
    height: "48px",
    width: "48px",
    //top: "1.8px",
    //left: "1.8px",
    //backfaceVisibility: "hidden",
    position: "absolute",
    background: "#563812",//"#563812",
  },
  //dice__corner_nth_child_1: { bottom: "0px", left: "0px", transform: "rotateX(90deg) translateZ(30px) rotateY(-45deg) translateZ(-4px) rotateX(-45deg) translateX(-5px) " },

  dice__corner_nth_child_1: { left: "26px", top: "-4px", transform: "rotateY(45deg) translateZ(-39px) rotateX(-45deg) rotateZ(60deg)" },
  dice__corner_nth_child_2: { left: "26px", top: "-4px", transform: "rotateY(-45deg) translateZ(39px) rotateX(45deg) rotateZ(60deg)" },
  dice__corner_nth_child_3: { left: "19px", top: "-4px", transform: "rotateY(135deg) translateZ(39px) rotateX(45deg) rotateZ(60deg)" },
  dice__corner_nth_child_4: { left: "19px", top: "-4px", transform: "rotateY(-135deg) translateZ(-36px) rotateX(-45deg) rotateZ(60deg)" },

  dice__corner_nth_child_5: { left: "24px", top: "47px", transform: "rotateY(-45deg) translateZ(39px) rotateX(-45deg) rotateZ(0deg)" },
  dice__corner_nth_child_6: { left: "24px", top: "47px", transform: "rotateY(-135deg) translateZ(39px) rotateX(-45deg) rotateZ(0deg)" },
  dice__corner_nth_child_7: { left: "22px", top: "47px", transform: "rotateY(45deg) translateZ(39px) rotateX(-45deg) rotateZ(0deg)" },
  dice__corner_nth_child_8: { left: "22px", top: "47px", transform: "rotateY(135deg) translateZ(39px) rotateX(-45deg) rotateZ(0deg)" },

  dice__inner_plane_1: {},
  dice__inner_plane_2: {top: "10px",transform: "rotateY(90deg)"},
  dice__inner_plane_3: {left: "2px", transform: "rotateX(90deg)"},



  //dice__corner_nth_child_1: { transform: "rotateZ(0deg) rotateX(0deg) rotateY(45deg) translateZ(-35px) rotateZ(60deg)" },
  //dice__corner_nth_child_2: { transform: "rotateZ(0deg) rotateX(0deg) rotateY(135deg) translateZ(-35px) rotateZ(60deg)" },
  //dice__corner_nth_child_3: { transform: "rotateZ(0deg) rotateX(0deg) rotateY(-135deg) translateZ(-35px) rotateZ(60deg)" },
  //dice__corner_nth_child_4: { transform: "rotateZ(0deg) rotateX(0deg) rotateY(-45deg) translateZ(-35px) rotateZ(60deg)" },

  //dice__corner_nth_child_5: { transform: "rotateZ(180deg) rotateY(45deg)  rotateX(0deg) translateZ(35px) rotateY(0deg)" },
  //dice__corner_nth_child_6: { transform: "rotateX(180deg) rotateY(135deg) translateZ(35px) rotateZ(120deg) rotateX(0deg) rotateY(60deg)" },

  /*
  dice__corner_nth_child_1: { transform: "rotateX(45deg) rotateY(45deg) translateZ(-35px) translateY(0px) translateX(8px)" }, // 1, 4
  dice__corner_nth_child_2: { transform: "rotateX(135deg) rotateY(45deg) translateZ(-35px) translateY(0px) translateX(8px)" }, // 2, 5
  dice__corner_nth_child_3: { transform: "rotateX(45deg) rotateY(225deg) translateZ(-35px) translateY(0px) translateX(8px)" }, // 1, 1
  dice__corner_nth_child_4: { transform: "rotateX(135deg) rotateY(225deg) translateZ(-35px) translateY(0px) translateX(8px)" }, // 1, 5

  dice__corner_nth_child_5: { transform: "rotateX(-135deg) rotateY(45deg) translateZ(-35px) translateY(0px) translateX(8px)" }, // 1, 2
  dice__corner_nth_child_6: { transform: "rotateX(-135deg) rotateY(225deg) translateZ(-35px) translateY(0px) translateX(8px)" }, // 1, 2
  dice__corner_nth_child_7: { transform: "rotateX(-45deg) rotateY(225deg) translateZ(-35px) translateY(0px) translateX(8px)" }, // 1, 2
  dice__corner_nth_child_8: { transform: "rotateX(-45deg) rotateY(45deg) translateZ(-35px) translateY(0px) translateX(8px)" }, // 1, 2
  */
  /*
  dice__corner_nth_child_6: { transform: "rotateX(135deg) rotateY(225deg) translateZ(35px) translateY(0px) translateX(10px)" }, // 1, 5
  dice__corner_nth_child_7: { transform: "rotateX(135deg) rotateY(225deg) translateZ(35px) translateY(0px) translateX(10px)" }, // 1, 5
  dice__corner_nth_child_8: { transform: "rotateX(135deg) rotateY(225deg) translateZ(35px) translateY(0px) translateX(10px)" }, // 1, 5
  */

  dice__front: { transform: "rotateY(180deg) translateZ(30px)" },
  dice__front_span_nth_child_1: { top: "10px", left: "12px" },
  dice__front_span_nth_child_2: { top: "10px", right: "12px" },
  dice__front_span_nth_child_3: { top: "23px", left: "12px" },
  dice__front_span_nth_child_4: { top: "23px", right: "12px" },
  dice__front_span_nth_child_5: { bottom: "10px", left: "12px" },
  dice__front_span_nth_child_6: { bottom: "10px", right: "12px" },
  dice__back: { transform: "rotateX(0deg) translateZ(30px)" },
  dice__back_img: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "4px",
    width: "45px",
    height: "45px",
  },
  dice__back_span: { top: "23px", left: "23px" },
  dice__right: { transform: "rotateY(-90deg) translateZ(30px)" },
  dice__right_span_nth_child_1: { top: "12px", left: "12px" },
  dice__right_span_nth_child_2: { top: "12px", right: "12px" },
  dice__right_span_nth_child_3: { top: "23px", left: "23px" },
  dice__right_span_nth_child_4: { bottom: "12px", left: "12px" },
  dice__right_span_nth_child_5: { bottom: "12px", right: "12px" },
  dice__left: { transform: "rotateY(90deg) translateZ(30px)" },
  dice__left_span_nth_child_1: { top: "12px", right: "12px" },
  dice__left_span_nth_child_2: { bottom: "12px", left: "12px" },
  dice__top: { transform: "rotateX(-90deg) translateZ(30px)" },
  dice__top_span_nth_child_1: { top: "12px", right: "12px" },
  dice__top_span_nth_child_2: { bottom: "12px", left: "12px" },
  dice__top_span_nth_child_3: { bottom: "23px", left: "23px" },
  dice__bottom: { transform: "rotateX(90deg) translateZ(30px)" },
  dice__bottom_span_nth_child_1: { top: "12px", right: "12px" },
  dice__bottom_span_nth_child_2: { top: "12px", left: "12px" },
  dice__bottom_span_nth_child_3: { bottom: "12px", left: "12px" },
  dice__bottom_span_nth_child_4: { bottom: "12px", right: "12px" },
  button: {
    position: "fixed",
    bottom: "20px",
    background: "#f76939",
    padding: "20px 40px",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
  button_hover: { background: "#f76939" },
};