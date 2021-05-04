package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

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
	Contra   string `json:"contra"`
	Base     string `json:"base64"`
}

type Curso struct {
	Nombre      string `json:"nombre"`
	Descripcion string `json:"desc"`
	Auxiliar    string `json:"aux"`
}
type Imagen struct {
	Base string `json:"base64"`
}

type Usuario struct {
	Username          string `json:"username"`
	Contra            string `json:"contra"`
	Nombre            string `json:"nombre"`
	Apellido          string `json:"apellido"`
	Tier              int    `json:"tier"`
	Fecha_naciemiento string `json:"fecha_naciemiento"`
	Fecha_registro    string `json:"fecha_registro"`
	Correo            string `json:"correo"`
	Foto              string `json:"foto"`
	Base              string `json:"base64"`
}
type User struct {
	Username string `json:"username"`
}
type Retorno struct {
	Username          string `json:"username"`
	Contra            string `json:"contra"`
	Nombre            string `json:"nombre"`
	Apellido          string `json:"apellido"`
	Tier              int    `json:"tier"`
	Fecha_naciemiento string `json:"fecha_naciemiento"`
	Fecha_registro    string `json:"fecha_registro"`
	Correo            string `json:"correo"`
	Foto              string `json:"foto"`
	Base              string `json:"base"`
}
type update struct {
	Username          string `json:"username"`
	Contra            string `json:"contra"`
	Nombre            string `json:"nombre"`
	Apellido          string `json:"apellido"`
	Tier              int    `json:"tier"`
	Fecha_naciemiento string `json:"fecha_naciemiento"`
	Fecha_registro    string `json:"fecha_registro"`
	Correo            string `json:"correo"`
	Foto              string `json:"foto"`
	Base              string `json:"base64"`
}

type Lista struct {
	A struct {
		Nombre     string `yaml:"nombre"`
		Apellido   string `yaml:"apellido"`
		Password   string `yaml:"password"`
		Username   string `yaml:"username"`
		Resultados struct {
			Temporada string `yaml:"temporada"`
			Tier      string `yaml:"tier"`
			Jornadas  struct {
				Jornada      string `yaml:"jornada"`
				Predicciones struct {
					Deporte    string `yaml:"deporte"`
					Fecha      string `yaml:"fecha"`
					Visitante  string `yaml:"visitante"`
					Local      string `yaml:"local"`
					Prediccion struct {
						Visitante int64
						Local     int64
					} `yaml:"prediccion"`
					Resultado struct {
						Visitante int64
						Local     int64
					} `yaml:"resultado"`
				} `yaml:"Predicciones"`
			} `yaml:"Jornadas"`
		} `yaml:"resultados"`
	} `yaml:"A2"`
}

/*--------------------------carga masiva---------------*/
type Resultados struct {
	Temporada string    `json:"temporada"`
	Tier      string    `json:"tier"`
	Jornadas  []Jornada `Json:"jornadas"`
}

type Jornada struct {
	Jornada string   `json:"jornada"`
	Evento  []Evento `json:"predicciones"`
}

type Evento struct {
	Deporte    string     `json:"deporte"`
	Fecha      string     `json:"fecha"`
	Visitante  string     `json:"visitante"`
	Local      string     `json:"local"`
	Prediccion Prediccion `json:"prediccion"`
	Resultado  Resultado  `json:"resultado"`
}

type Prediccion struct {
	Visitante int `json:"visitante"`
	Local     int `json:"local"`
}

type Resultado struct {
	Visitante int `json:"visitante"`
	Local     int `json:"local"`
}

type Usuarios struct {
	Nombre     string       `yaml:"nombre"`
	Apellido   string       `yaml:"apellido"`
	Pass       string       `json:"password"`
	User       string       `json:"username"`
	Resultado_ []Resultados `json:"resultados"`
}

type Info map[string]Usuarios

func CrearImagen(w http.ResponseWriter, r *http.Request) {
	var img Imagen
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &img)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(img.Base))
	dec, err := base64.StdEncoding.DecodeString(img.Base)
	if err != nil {
		panic(err)
	}

	f, err := os.Create("imagenes/" + "admin")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	if _, err := f.Write(dec); err != nil {
		panic(err)
	}
	if err := f.Sync(); err != nil {
		panic(err)
	}

}
func Crear_Usuario(w http.ResponseWriter, r *http.Request) {

}

func pruebapost(w http.ResponseWriter, r *http.Request) {
	var pruebita Usuario
	reqBody, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(reqBody, &pruebita)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(http.StatusOK)
	//w.Write([]byte(pruebita.Base)) //----devuelvo el username en el response del POST
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("insert into Usuario(username,contra,nombre,apellido,tiers,fecha_naciemiento,fecha_registro,correo,foto,tipo) values(:1, :2,:3,:4,:5,:6,:7,:8,:9,:10)", pruebita.Username, pruebita.Contra, pruebita.Nombre, pruebita.Apellido, pruebita.Tier, pruebita.Fecha_naciemiento, pruebita.Fecha_registro, pruebita.Correo, pruebita.Foto, 1)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())
	w.Write([]byte(pruebita.Base))
	dec, err := base64.StdEncoding.DecodeString(pruebita.Base)
	if err != nil {
		panic(err)
	}
	f, err := os.Create("imagenes/" + pruebita.Username)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	if _, err := f.Write(dec); err != nil {
		panic(err)
	}
	if err := f.Sync(); err != nil {
		panic(err)
	}

}

func toBase64(b []byte) string {
	return base64.StdEncoding.EncodeToString(b)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var logu login
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &logu)

	//w.WriteHeader(http.StatusOK)
	//w.Write([]byte(logu.Username))

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	var id string
	var pass string
	var foto string
	var err2 error
	err2 = db.QueryRow(" select username, contra,foto from Usuario where username = "+"'"+logu.Username+"'").Scan(&id, &pass, &foto)
	if err2 != nil {
		http.Error(w, err2.Error(), http.StatusInternalServerError)
		return
	}
	if foto == "" {
		println("No hay una foto que enviar")

	} else {
		bytes, err := ioutil.ReadFile(foto)
		if err != nil {
			log.Fatal(err)
		}
		var base64Encoding string

		// Append the base64 encoded output
		base64Encoding += toBase64(bytes)

		// Print the full base64 representation of the image
		//fmt.Println("esto es la codificacion:" + base64Encoding)
		logu.Contra = pass
		logu.Base = base64Encoding
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(logu)
	}

}

func getUsers(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	rows2, err2 := db.Query("select *from Usuario")
	if err2 != nil {
		log.Fatal("Error fetching user data\n", err)
	}
	defer rows2.Close()
	for rows2.Next() {
		var nombre string
		var contra string
		rows2.Scan(&nombre)
		rows2.Scan(&contra)
		fmt.Println("Usuario " + nombre)
		fmt.Println("contra " + contra)
	}

}

func ObtenerUsuario(w http.ResponseWriter, r *http.Request) {
	var u User
	var ret Retorno
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &u)

	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	var id int
	var username string
	var pass string
	var name string
	var apellido string
	var tier int
	var fechaNac string
	var fechaReg string
	var correo string
	var foto string
	var tipo string
	var err2 error
	err2 = db.QueryRow(" select  *from Usuario where username = "+"'"+u.Username+"'").Scan(&id, &username, &pass, &name, &apellido, &tier, &fechaNac, &fechaReg, &correo, &foto, &tipo)

	if err2 != nil {
		http.Error(w, err2.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	ret.Username = username
	ret.Contra = pass
	ret.Nombre = name
	ret.Apellido = apellido
	ret.Tier = tier
	ret.Fecha_naciemiento = fechaNac
	ret.Fecha_registro = fechaReg
	ret.Correo = correo
	ret.Foto = foto
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ret)

}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var pruebita update
	reqBody, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(reqBody, &pruebita)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(http.StatusOK)
	//w.Write([]byte(pruebita.Base)) //----devuelvo el username en el response del POST
	db, err := sql.Open("oci8", "TEST/1234@localhost:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("update Usuario set username = '" + pruebita.Username + "', nombre = '" + pruebita.Nombre + "',apellido='" + pruebita.Apellido + "',fecha_naciemiento ='" + pruebita.Fecha_naciemiento + "',correo = '" + pruebita.Correo + "',foto='" + pruebita.Foto + "' where username ='" + pruebita.Username + "'")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res.LastInsertId())
	w.Write([]byte(pruebita.Base))
	if pruebita.Base == "" {
		fmt.Println("NO se cambiara la foto")

	} else {
		dec, err := base64.StdEncoding.DecodeString(pruebita.Base)
		if err != nil {
			panic(err)
		}
		f, err := os.Create("imagenes/" + pruebita.Username)
		if err != nil {
			panic(err)
		}
		defer f.Close()

		if _, err := f.Write(dec); err != nil {
			panic(err)
		}
		if err := f.Sync(); err != nil {
			panic(err)
		}
	}

}

func CargaMasiva(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var carga Info

	json.NewDecoder(r.Body).Decode(&carga)
	for key, element := range carga {
		fmt.Println("key: " + key)
		fmt.Println("Usuario:", element.User)
		fmt.Print("\t")
		fmt.Println("Clave:", element.Pass)
		fmt.Print("\t")
		fmt.Println("Nombre:", element.Nombre)
		fmt.Print("\t")
		fmt.Println("Apellido:", element.Apellido)
	}

}
func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/pruebapost", pruebapost).Methods("POST")
	router.HandleFunc("/getuser", getUsers).Methods("GET")
	router.HandleFunc("/login", Login).Methods("POST")
	router.HandleFunc("/carga", CargaMasiva).Methods("POST")
	router.HandleFunc("/image", CrearImagen).Methods("POST")
	router.HandleFunc("/obU", ObtenerUsuario).Methods("POST")
	router.HandleFunc("/update", UpdateUser).Methods("POST")
	fmt.Println("Esta funcionando")

	log.Fatal(http.ListenAndServe(":3030", router)) //log.fatal como que lo mantiene a la escucha y permite pararlo
}
