package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-oci8"
)

type Proc struct {
	Nombre string
}

type prueba struct {
	Id     int    `json:"id"`
	Nombre string `json:"nombre"`
}

type login struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Curso struct {
	Nombre      string `json:"nombre"`
	Descripcion string `json:"desc"`
	Auxiliar    string `json:"aux"`
}

type Usuario struct {
	id_usuario        int    `json:"id_usuario"`
	username          string `json:"username"`
	nombre            string `json:"nombre"`
	apellido          string `json:"apellido"`
	tier              string `json:"tier"`
	fecha_naciemiento string `json:"fecha_nacimiento"`
	fecha_registro    string `json:"fecha_registro"`
	correo            string `json:"correo"`
	foto              string `json:"foto"`
}

// to simulate a database
var Cursos []Curso

func Crear_Usuario(w http.ResponseWriter, r *http.Request) {
	fmt.Println("entro en el crear")
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("insert into Usuario(username,contra,nombre,apellido,tiers,fecha_naciemiento,fecha_registro,correo,foto) values(:1, :2,:3,:4,:5,:6,:7,:8,:9)", "Eduardo21", "caca1234", "Eduardo", "Tun", "gold", "10/10/10", "15/15/15", "eduardotun27565@gmail.com", "scasd")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())

}

func pruebapost(w http.ResponseWriter, r *http.Request) {
	var pruebita login
	//var loginprueba login
	// we will need to extract the `id` of the article we
	// wish to delete
	reqBody, _ := ioutil.ReadAll(r.Body)

	//---el body lo vuelvo un struct para acceder a sus atributos
	json.Unmarshal(reqBody, &pruebita)
	println(pruebita.Username)
	println(pruebita.Password)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(pruebita.Username)) //----devuelvo el username en el response del POST

}

func pruebaget(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Endpoint Hit: Devuelvo todos los cursos")
	json.NewEncoder(w).Encode(Cursos)

	//	convertir_a_cadena := string(jsonResponse)
	//	fmt.Println(convertir_a_cadena)
	//fmt.Println("LLEGUE AL FINAL A RETORNAR JSON", jsonResponse)
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	rows2, err2 := db.Query("SELECT username from Usuario")
	if err2 != nil {
		log.Fatal("Error fetching user data\n", err)
	}
	defer rows2.Close()
	//fmt.Println(rows2)

	for rows2.Next() {
		var nombre string
		rows2.Scan(&nombre)
		fmt.Println("Usuario " + nombre)
	}

}
func main() {
	Cursos = []Curso{
		Curso{Nombre: "Archivos", Descripcion: "Curso yuca", Auxiliar: "Alan"},
		Curso{Nombre: "IPC1", Descripcion: "Primer curso de programación", Auxiliar: "Cesar"},
	}

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/createuser", Crear_Usuario).Methods("POST")
	router.HandleFunc("/pruebaget", pruebaget).Methods("GET")
	router.HandleFunc("/getuser", getUsers).Methods("GET")
	fmt.Println("Esta funcionando")

	log.Fatal(http.ListenAndServe(":3030", router)) //log.fatal como que lo mantiene a la escucha y permite pararlo
}
