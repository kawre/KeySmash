import React from "react";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import styled from "styled-components";
import { Result } from "../generated/graphql";
import { date } from "../Shared/utils/date";
// Types -------------------------------------------------------------------------

interface Props {
  data: any[];
  title: string;
}

// Component ---------------------------------------------------------------------
const ResultTable: React.FC<Props> = ({ data, title }) => (
  <Wrapper>
    <Text style={{ width: "auto" }}>{title}</Text>
    <Table>
      <TableHead>
        <Tr>
          <Td>wpm</Td>
          <Td>raw</Td>
          <Td>accuracy</Td>
          <Td>
            correct
            <br />
            chars
          </Td>
          <Td>
            incorrect
            <br />
            chars
          </Td>
          <Td>time</Td>
          <Td>info</Td>
          <Td>date</Td>
        </Tr>
      </TableHead>
      <TableBody>
        {(data as [Result]).map((h) => (
          <TableRow key={h.createdAt}>
            <Td>{h.wpm}</Td>
            <Td>{h.raw}</Td>
            <Td>{h.accuracy}%</Td>
            <Td>{h.correct}</Td>
            <Td>{h.incorrect}</Td>
            <Td>{h.time}s</Td>
            <Td
              aria-label={`${h.correct} correct / ${h.incorrect} incorrect / ${h.extra} extra / ${h.missed} misesed`}
            >
              <FaInfoCircle aria-label={"elo"} />
            </Td>
            <Td style={{ whiteSpace: "pre", lineHeight: "22px" }}>
              {date(h.createdAt)}
            </Td>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Wrapper>
);

export default ResultTable;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 75px 0;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
  border-collapse: collapse;

  color: ${({ theme }) => theme.text};
`;

const TableHead = styled.thead`
  font-size: 12px;
  color: ${({ theme }) => theme.sub};
`;

const TableBody = styled.tbody``;

const Tr = styled.tr``;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background: #0000001a;
  }
`;

const Td = styled.td`
  padding: 8px;
`;

const Text = styled.p`
  font-size: 16px;
`;

const Info = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.main};
`;
