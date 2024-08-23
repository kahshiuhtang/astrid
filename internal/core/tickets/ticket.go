package ticket

import "time"

type TicketType int

const (
	Incident TicketType = iota
	Request
)

type CriticalityType int

const (
	Low CriticalityType = iota
	Medium
	High
	Urgent
)

type TicketState int

const (
	Pending TicketState = iota
	Active
	Closed
)

type Ticket struct {
	TicketId     string
	Subject      string
	StartDate    time.Time
	LastChanged  time.Time
	Team         string
	State        TicketState
	CreatedBy    string
	RequestedFor string
	AssignedTo   string
	Keywords     []string
	Criticality  CriticalityType
	Type         TicketType
}
