<?php


/*
Menentukan apakah event tersebut diadakan online atau offline
Jika online maka harus ada link nya
Jika offline maka harus ada alamatnya
*/

interface BasedEvent
{
    public function getBasedEvent();
}
interface IsOnline
{
    public function setLink();
    public function editLink($link);
    public function getLink();
}
interface IsOffline
{
    public function setAddress();
    public function editAddress($address);
    public function getAddress();
}
abstract class BasedEnum
{
    const ONLINE = 0;
    const OFFLINE = 1;
}

/*
Menentukan apakah event berbayar atau tidak
Jika berbayar maka harus ada harga tiket nya
*/
interface IsEventPaid
{
    public function setPrice($price);
}
interface Price
{
    public function getPrice();
}
/*
Apa event tersebut berjalan lebih dari satu hari?
Jika iya setdays harus rest
*/
interface EventMultiDay
{
    public function setDays(...$days);
    public function getDays();
}
interface EventSingleDay
{
    public function setDays($days);
    public function getDays();
}

/*
Menentukan apakah event terbatas?
Jika iya maka harus menentukan berapa maksimal visitor
*/
interface EventLimitVisitor
{
    public function setMaxVisitor();
    public function getMaxVisitor();
}

/*
Parrent dari semua event
Biasanya event memiliki
id, date, name
*/
abstract class Event
{
    private $id;
    private $date;
    private $name;

    function __construct($id, $date, $name, Price $price)
    {
        $this->id = $id;
        $this->date = $date;
        $this->name = $name;
    }
}

/*
Price Event terbagi menjadi dua, yaitu gratis dan berbayar
event yang gratis variabel price akan auto assign menjadi 0
dan tidak bisa diset

Implementasi dari interface Price, karna event pasti ada price
*/
class EventFree implements Price
{
    private $price;
    function __construct()
    {
        $this->price = 0;
    }
    public function getPrice()
    {
        return $this->price;
    }
}

class EventPaid implements IsEventPaid, Price
{
    private $price;
    function __construct($price)
    {
        $this->price = $price;
    }
    public function setPrice($price)
    {
        $this->price = $price;
    }
    public function getPrice()
    {
        return $this->price;
    }
}

/*
Lokasi event terbagi 2, yaitu online dan offlie
*/

class EventOnline implements BasedEvent, IsOnline
{
    private $baseEvent;

    function __construct()
    {
        $this->baseEvent = BasedEnum::ONLINE;
    }

    public function setLink()
    {
    }
    public function editLink($link)
    {
    }
    public function getLink()
    {
    }
    public function getBasedEvent()
    {
        return $this->baseEvent;
    }
}

class EventOffline implements BasedEvent, IsOffline
{
    private $baseEvent;

    function __construct()
    {
        $this->baseEvent = BasedEnum::OFFLINE;
    }

    public function setAddress()
    {
    }
    public function editAddress($address)
    {
    }
    public function getAddress()
    {
    }
    public function getBasedEvent()
    {
        return $this->baseEvent;
    }
}

$sakumatsu = new Event();

var_dump($sakumatsu);
