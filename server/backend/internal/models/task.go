package models

type TaskModel struct {
	ID int64 `gorm:"primaryKey" json:"id"`
}
