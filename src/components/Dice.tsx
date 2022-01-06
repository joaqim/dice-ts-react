// @ts-nocheck
import React, { Component, CSSProperties } from "react";
import DiceStyle from "../styles/DiceStyle";

//class Dice extends Component {
const Dice = (props: any) => 
      <div style={DiceStyle["dice_container"]}>
        <div style={{ ...DiceStyle["dice"], ...props.style }}>
          <div style={{
            ...DiceStyle["dice__inner_plane_1"],
            ...DiceStyle["dice_inner_plane"]
          }} />
          <div style={{
            ...DiceStyle["dice__inner_plane_2"],
            ...DiceStyle["dice_inner_plane"]
          }} />
          <div style={{
            ...DiceStyle["dice__inner_plane_3"],
            ...DiceStyle["dice_inner_plane"]
          }} />
          {/*
          <span style={{
              ...DiceStyle["dice__corner_nth_child_1"],
              ...DiceStyle["dice_corner"],
            }} />
          <span style={{
              ...DiceStyle["dice__corner_nth_child_2"],
              ...DiceStyle["dice_corner"],
            }} />
            <span style={{
              ...DiceStyle["dice__corner_nth_child_3"],
              ...DiceStyle["dice_corner"],
            }} />
            <span style={{
              ...DiceStyle["dice__corner_nth_child_4"],
              ...DiceStyle["dice_corner"],
            }} />*/}
          <span style={{
            ...DiceStyle["dice__corner_nth_child_5"],
            ...DiceStyle["dice_corner"],
          }} />
          <span style={{
            ...DiceStyle["dice__corner_nth_child_6"],
            ...DiceStyle["dice_corner"],
          }} />
          <span style={{
            ...DiceStyle["dice__corner_nth_child_7"],
            ...DiceStyle["dice_corner"],
          }} />
          <span style={{
            ...DiceStyle["dice__corner_nth_child_8"],
            ...DiceStyle["dice_corner"],
          }} />
          <div
            style={{
              ...DiceStyle["dice__front"],
              ...DiceStyle["dice___div"],
            }}
          >
            <span
              style={{
                ...DiceStyle["dice__front_span_nth_child_1"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__front_span_nth_child_2"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__front_span_nth_child_3"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__front_span_nth_child_4"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__front_span_nth_child_5"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__front_span_nth_child_6"],
                ...DiceStyle["dice_span"],
              }}
            />
          </div>
          <div
            style={{ ...DiceStyle["dice__back"], ...DiceStyle["dice___div"] }}
          >
            {/*<img src={DiceTexture} alt="" DiceStyle={DiceStyle["dice__back_img"]} />*/}
            <span
              style={{
                ...DiceStyle["dice__back_span"],
                ...DiceStyle["dice_span"],
              }}
            />
          </div>
          <div
            style={{
              ...DiceStyle["dice__right"],
              ...DiceStyle["dice___div"],
            }}
          >
            <span
              style={{
                ...DiceStyle["dice__right_span_nth_child_1"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__right_span_nth_child_2"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__right_span_nth_child_3"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__right_span_nth_child_4"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__right_span_nth_child_5"],
                ...DiceStyle["dice_span"],
              }}
            />
          </div>
          <div
            className="left"
            style={{ ...DiceStyle["dice__left"], ...DiceStyle["dice___div"] }}
          >
            <span
              style={{
                ...DiceStyle["dice__left_span_nth_child_1"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__left_span_nth_child_2"],
                ...DiceStyle["dice_span"],
              }}
            />
          </div>
          <div
            style={{ ...DiceStyle["dice__top"], ...DiceStyle["dice___div"] }}
          >
            <span
              style={{
                ...DiceStyle["dice__top_span_nth_child_1"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__top_span_nth_child_2"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__top_span_nth_child_3"],
                ...DiceStyle["dice_span"],
              }}
            />
          </div>
          <div
            style={{
              ...DiceStyle["dice__bottom"],
              ...DiceStyle["dice___div"],
            }}
          >
            <span
              style={{
                ...DiceStyle["dice__bottom_span_nth_child_1"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__bottom_span_nth_child_2"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__bottom_span_nth_child_3"],
                ...DiceStyle["dice_span"],
              }}
            />
            <span
              style={{
                ...DiceStyle["dice__bottom_span_nth_child_4"],
                ...DiceStyle["dice_span"],
              }}
            />
          </div>
        </div>
      </div>

export default Dice;
