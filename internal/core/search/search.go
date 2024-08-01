package search

type Comparator int
type QueryType int
type SearchType int

const (
	EQUALS Comparator = iota
	NOT_EQUALS
	GREATER_THAN
	LESS_THAN
	GREATER_THAN_OR_EQUAL
	LESS_THAN_OR_EQUAL
)

/*
Exact Search: Finds precise matches.
Fuzzy Search: Allows for approximate matches, handling misspellings.
Wildcard Search: Flexible matching with wildcard characters.
Phrase Search: Matches exact sequences of words.
Proximity Search: Finds terms within a certain distance.
Boolean Search: Combines terms with Boolean operators.
Range Search: Searches within specified value ranges.
*/
const (
	EXACT SearchType = iota
	FUZZY
	WILDCARD
	PHRASE
	PROXIMITY
	RANGE
)
const (
	TERM QueryType = iota
	POSITION
	START_POSITION
	END_POSITION
)

type Query struct {
	Type                QueryType
	Value               string
	ComparisonOperation Comparator
	Specifications      map[string]string
}

func ParseQuery(query string) {

}
