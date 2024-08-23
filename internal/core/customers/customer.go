package customer

import "time"

type Address struct {
	Street     string
	City       string
	State      string
	PostalCode string
	Country    string
}
type CustomerEventType int

const (
	EmailSent CustomerEventType = iota
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

type CustomerEvent struct {
	Date        time.Time
	Description string
	Type        CustomerEventType
	EventId     string
}
type Customer struct {
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
