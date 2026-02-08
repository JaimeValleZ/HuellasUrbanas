package com.huellas_urbanas.repository;

import com.huellas_urbanas.entities.Hogar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IHogarRepository extends JpaRepository<Hogar, Long> {
}
