import React from "react";
import { Column, Row } from "nav-frontend-grid";
import BEMHelper from "../../utils/bem";

type ColumnSize =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

interface Props {
  columnSizeTittel: ColumnSize;
  ikon: React.ReactNode;
  label: string;
  columnSizeSats?: ColumnSize;
  sats?: string;
  columnSizeOperator?: ColumnSize;
  operator?: string;
  columnSizeSum: ColumnSize;
  sum: string;
}

const cls = BEMHelper("visUtregningenPanel");

const TabellRad: React.FunctionComponent<Props> = (props) => {
  const {
    columnSizeTittel,
    columnSizeSats,
    columnSizeOperator,
    columnSizeSum,
  } = props;
  return (
    <Row className={cls.element("rad")}>
      <Column
        md={columnSizeTittel}
        sm={columnSizeTittel}
        xs={columnSizeTittel}
        className={cls.element("tittel")}
      >
        <div className={cls.element("tittel")}>
          {props.ikon}
          {props.label}
        </div>
      </Column>
      {props.sats && (
        <Column md={columnSizeSats} sm={columnSizeSats} xs={columnSizeSats}>
          {props.sats}
        </Column>
      )}
      {props.operator && (
        <Column
          md={columnSizeOperator}
          sm={columnSizeOperator}
          xs={columnSizeOperator}
        >
          {props.operator}
        </Column>
      )}
      <Column
        md={columnSizeSum}
        sm={columnSizeSum}
        xs={columnSizeSum}
        className={cls.element("column__siste")}
      >
        {props.sum}
      </Column>
    </Row>
  );
};

export default TabellRad;
