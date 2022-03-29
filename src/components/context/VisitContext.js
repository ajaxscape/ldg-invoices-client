import React, { useContext, useEffect, useState } from 'react'
import { useData } from './DataContext'
import { format } from 'date-fns'
import nearestDateTime from '../../utilities/nearestDateTime'

export const VisitContext = React.createContext(undefined)

export const useVisit = () => useContext(VisitContext)

export const VisitProvider = ({ children, visitId, customerId }) => {
  const [visitCustomerId, setVisitCustomerId] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [duration, setDuration] = useState('')
  const [timeWorked, setTimeWorked] = useState('')
  const [timeRested, setTimeRested] = useState('')
  const [total, setTotal] = useState(0)
  const [durationInMinutes, setDurationInMinutes] = useState(0)
  const [property, setProperty] = useState()
  const [tasks, setTasks] = useState()
  const [taskTypes, setTaskTypes] = useState()
  const [visitDateTime, setVisitDateTime] = useState({})
  const { getVisitById, getCustomerById, saveVisit } = useData()

  useEffect(() => {
    if (customerId) {
      const customer = getCustomerById(customerId)
      if (customer?.customerTaskTypes?.length) {
        setTaskTypes(customer.customerTaskTypes)
      }
    }
    let visit
    if (visitId) {
      visit = getVisitById(visitId)
    }
    if (visit) {
      const { property, visitDate, startTime, finishTime, tasks } = visit
      setVisitDateTime({
        visitDate: new Date(visitDate),
        startTime: new Date(`${visitDate} ${startTime}`),
        finishTime: tasks?.length
          ? new Date(`${visitDate} ${finishTime}`)
          : nearestDateTime(15),
      })
      setProperty({ ...property })
      setTasks([...tasks])
      setVisitCustomerId(visit.customerId)
    } else {
      setVisitDateTime({
        visitDate: nearestDateTime(15),
        startTime: nearestDateTime(15),
        finishTime: nearestDateTime(15),
      })
      // Now get first property from customer as default
      if (customerId) {
        const customer = getCustomerById(customerId)
        if (customer?.properties?.length) {
          setProperty(customer.properties[0])
        }
        setVisitCustomerId(customerId)
      }
      setTasks([])
    }
  }, [visitId])

  useEffect(() => {
    if (visitDateTime?.startTime && visitDateTime?.finishTime) {
      const durationInMinutes =
        (visitDateTime?.finishTime - visitDateTime?.startTime) / 60000
      setDurationInMinutes(durationInMinutes)
    }
  }, [visitDateTime])

  const formatTime = (timeInMinutes) => {
    const minutes = timeInMinutes % 60
    const hours = Math.floor(timeInMinutes / 60)
    return `${hours} hour${hours === 1 ? '' : 's'}, ${minutes} minute${
      minutes === 1 ? '' : 's'
    }`
  }

  useEffect(() => {
    setDuration(formatTime(durationInMinutes))
  }, [durationInMinutes])

  useEffect(() => {
    setTimeWorked(formatTime(totalHours * 60))
  }, [totalHours])

  useEffect(() => {
    setTimeRested(formatTime(durationInMinutes - totalHours * 60))
  }, [totalHours, durationInMinutes])

  useEffect(() => {
    if (Array.isArray(tasks)) {
      const totals = tasks
        ?.filter(({ isMarkedForDeletion }) => !isMarkedForDeletion)
        .filter(({ taskType }) => !!taskType)
        .reduce(
          ({ total, totalHours }, task) => {
            return {
              total: total + task.quantity * task.price,
              totalHours: totalHours + task.quantity,
            }
          },
          { total: 0, totalHours: 0 }
        )
      if (totals.total !== total) {
        setTotal(totals.total)
      }
      if (totals.totalHours !== totalHours) {
        setTotalHours(Math.round(totals.totalHours * 100) / 100)
      }
    }
  }, [tasks])

  const save = () => {
    const { visitDate, startTime, finishTime } = visitDateTime
    const visit = {
      id: visitId,
      property,
      visitDate: format(visitDate, 'yyyy-MM-dd'),
      startTime: format(startTime, 'HH:mm:ss'),
      finishTime: format(finishTime, 'HH:mm:ss'),
      tasks,
    }
    saveVisit(visitCustomerId, visit)
  }

  return (
    <VisitContext.Provider
      value={{
        tasks,
        setTasks,
        taskTypes,
        property,
        setProperty,
        visitDateTime,
        setVisitDateTime,
        durationInMinutes,
        duration,
        total,
        totalHours,
        timeWorked,
        timeRested,
        save,
      }}
    >
      {children}
    </VisitContext.Provider>
  )
}
