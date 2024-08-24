package customer

import "time"

type Address struct {
	Street     string
	City       string
	State      string
	PostalCode string
	Country    string
}
type ContactEventType int

const (
	EmailSent ContactEventType = iota
	EmailReceived
	CallMade
	CallReceived
	MeetingScheduled
	MeetingHeld
	PurchaseMade
	InvoiceSent
	PaymentReceived
	RefundIssued
	QuoteRequested
	QuoteProvided
	ContractSigned
	SupportTicketCreated
	SupportTicketResolved
	FeedbackReceived
	IssueEscalated
	CustomerSurveySent
	CustomerSurveyCompleted
	NewsletterSubscribed
	NewsletterUnsubscribed
	CampaignEngaged
	PromotionOffered
	PromotionRedeemed
	WebsiteVisited
	ProductViewed
	ContentDownloaded
	FormSubmitted
	AccountCreated
	AccountUpdated
	EventRegistered
	EventAttended
	DemoRequested
	DemoCompleted
	ReferralMade
	OnboardingStarted
	OnboardingCompleted
	RenewalApproaching
	RenewalCompleted
	SubscriptionCancelled
	AccountUpgraded
	AccountDowngraded
)

type ContactEvent struct {
	Date        time.Time
	Description string
	Type        ContactEventType
	EventId     string
}
type Contact struct {
	Id          string
	Name        string
	Type        string
	Email       string
	PhoneNumber string
	Address     Address
	Tags        []string
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Notes       []string
}

type LeadStatus int

const (
	New LeadStatus = iota
	Contacted
	Working
	Unqualified
	Converted
)

type LeadEvent struct {
	EventId   string
	Message   string
	PosterId  string
	CreatedAt time.Time
}
type Lead struct {
	Name                  string
	Company               string
	Province              string
	Phone                 string
	Email                 string
	Owner                 string
	Rating                int
	CreatedDat            time.Time
	AdditionalInformation map[string]string
	LeadEvents            []LeadEvent
}

type AccountType int

const (
	None AccountType = iota
	Analyst
	Competitor
	Customer
	Integrator
	Investor
	Partner
)

type Account struct {
	Id              string
	Owner           string
	Name            string
	Parent          string
	Phone           string
	Fax             string
	Website         string
	Employees       string
	Industry        string
	Description     string
	Revenue         string
	BillingAddress  Address
	ShippingAddress Address
	Contacts        []string
	Notes           []string
	Files           []string
}

type OppurtunityType int

const (
	NewBusiness OppurtunityType = iota
	OldBusiness
)

type OppurtunityStage int

const (
	Qualification OppurtunityStage = iota
	ExampleStage
	Proposal
	Negotiation
	ClosedWon
	ClosedLost
)

type OppurtunityUpdate struct {
	Id            string
	UpdaterId     string
	Stage         string
	OppurtunityId string
	Modified      time.Time
}
type Oppurtunity struct {
	Id          string
	Description string
	Probability float32
	Amount      float32
	Source      string
	Stage       OppurtunityStage
	Type        OppurtunityType
	Updates     []OppurtunityUpdate
	Tasks       interface{}
}

// Table, Kanban, Split View (All on left, some on right)

type CaseStatus int

const (
	OpenCase CaseStatus = iota
	CloseCase
)

type CaseType int

const (
	Problem CaseType = iota
	FeatureRequest
	Question
)

type CaseOrigin int

const (
	FromEmail CaseOrigin = iota
	FromPhone
	FromWeb
	FromFacebook
	FromTwitter
	FromSocialMedia
)

type CaseReason int

const (
	UserMissedTraining CaseReason = iota
	ComplexFunctionality
	ExistingProblem
	UnclearInstructions
	NewProblem
)

type Priority int

const (
	Critical Priority = iota
	High
	Low
	Medium
)

type CaseDescription struct {
	Subject         string
	Description     string
	InitialComments string
}
type Cases struct {
	Id          string
	Status      CaseStatus
	Origin      CaseOrigin
	Priority    Priority
	Type        CaseType
	Description CaseDescription
	ContactId   string
	AccountId   string
	Email       string
}

// Need knowledge base that is searchable

// Reports, Dashboards are the same just some informatio
type TaskProgress int

const (
	NotStarted TaskProgress = iota
	InProgress
	Completed
	Deferred
	WaitingOnSomone
)

type CustomerTask struct {
	Id                 string
	CreatedBy          string
	AssignedTo         string
	RelatedToAccountId string
	RelatedToContactId string
	Subject            string
	Comments           string
	DueDate            time.Time
	Reminder           []string
	Progress           TaskProgress
	Priority           Priority
}

type Event struct {
	Id                 string
	CreatedBy          string
	AssignedTo         string
	RelatedToAccountId string
	RelatedToContactId string
	AllDayEvent        bool
	Subject            string
	Comments           string
	StartTime          time.Time
	EndTime            time.Time
	IsPrivate          bool
	Location           string
	Description        string
}
