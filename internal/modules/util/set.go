package util

type Set[T comparable] struct {
	elements map[T]int
}

func NewSet[T comparable]() Set[T] {
	return Set[T]{elements: make(map[T]int)}
}
func (s *Set[T]) Add(element T) {
	s.elements[element] = 1
}

func (s *Set[T]) Remove(element T) {
	delete(s.elements, element)
}
func (s *Set[T]) GetAll() []T {
	setContents := make([]T, 0, len(s.elements))
	for key := range s.elements {
		setContents = append(setContents, key)
	}
	return setContents
}

func (s *Set[T]) Contains(element T) bool {
	_, exists := s.elements[element]
	return exists
}

func (s *Set[T]) Size() int {
	return len(s.elements)
}

func (s *Set[T]) Clear() {
	s.elements = make(map[T]int)
}
