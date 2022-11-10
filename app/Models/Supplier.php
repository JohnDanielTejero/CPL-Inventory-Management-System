<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $primaryKey = "supp_id";
    public $timestamps = false;

    protected $fillable = [
        'Supp_Name',
        'Supp_Email',
        'Supp_ContactNo',
    ];

    public function product()
    {
        return $this->hasMany(Product::class);
    }
}
