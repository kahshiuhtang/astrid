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

type TicketStateChange struct {
	TicketStateChangeId string
	TicketId            string
	TicketFieldChange   string
	FieldOldValue       string
	Message             string
}
type Ticket struct {
	TicketId     string
	Subject      string
	Description  string
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

func CreateTicket() {

}
func SaveTicket() {

}

func UpdateTicket() {

}
