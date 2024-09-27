package main

import (
	"backend/internal/database"
	"backend/internal/routes"
	"backend/pkg/settings"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func init() {
	settings.Setup()
}

func main() {
	db := database.ConnectDatabase()

	router := routes.InitRouter(db)

	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"ping": "pong"})
	})

	addr := fmt.Sprintf(":%s", settings.ServerSettings.Port)
	server := &http.Server{
		Addr:    addr,
		Handler: router,
	}

	log.Fatal(server.ListenAndServe().Error())
}
