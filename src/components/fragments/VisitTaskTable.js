import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

function ccyFormat(num) {
  return `£${num.toFixed(2)}`
}

function VisitTaskRow({ task }) {
  return (
    <>
      {task?.quantity ? (
        <TableRow>
          <TableCell style={{ padding: 0, maxWidth: '6em' }} align="left">
            {task.taskType ? task.taskName : task.description}
          </TableCell>
          <TableCell style={{ padding: 0 }} align="right">
            {task.quantity && task.taskType ? task.quantity.toFixed(2) : ''}
          </TableCell>
          <TableCell style={{ padding: 0 }} align="right">
            {task.price ? ccyFormat(task.price * task.quantity) : ''}
          </TableCell>
        </TableRow>
      ) : null}
    </>
  )
}

export function VisitTaskTable({ tasks }) {
  return (
    <>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: 0, fontWeight: 'bold' }} align="left">
              Task
            </TableCell>
            <TableCell style={{ padding: 0, fontWeight: 'bold' }} align="right">
              Hours
            </TableCell>
            <TableCell style={{ padding: 0, fontWeight: 'bold' }} align="right">
              Cost
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks
            .filter(({ taskType }) => !!taskType)
            .map((task) => (
              <VisitTaskRow key={`task-${task.id}`} task={task} />
            ))}
          {tasks
            .filter(({ taskType }) => !taskType)
            .map((task) => (
              <VisitTaskRow key={`task-${task.id}`} task={task} />
            ))}
          <TableRow>
            <TableCell
              style={{ padding: 0, fontWeight: 'bold' }}
              colSpan={2}
              align="right"
            >
              Total
            </TableCell>
            <TableCell style={{ padding: 0 }} align="right">
              {ccyFormat(
                tasks.reduce(
                  (total, { quantity, price }) =>
                    quantity ? total + quantity * price : total,
                  0
                )
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
